from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
import stripe
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, List, Literal
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY") or "sk_test_emergent"
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")

# Email (Emergent managed Resend)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Consecrated Hands")
ORG_EMAIL = os.environ.get("ORG_EMAIL", "ConsecratedHands@Gmail.com")

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------------- Models ----------------
class DonationRequest(BaseModel):
    amount: float = Field(..., gt=0, le=100000)
    frequency: Literal["one_time", "monthly"] = "one_time"
    donor_name: str
    donor_email: EmailStr
    origin_url: str


class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    interest: Literal["volunteer", "mentor", "partner", "general"] = "general"
    message: str


# ---------------- Email helper ----------------
async def send_email(to: str, subject: str, html: str, reply_to: Optional[str] = None):
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing; skipping email send")
        return
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as c:
            resp = await c.post(f"{EMAIL_BASE_URL}/api/v1/email/send",
                                headers={"X-Email-Key": EMAIL_KEY}, json=payload)
        resp.raise_for_status()
    except Exception as e:
        logger.error(f"Email send error: {e}")


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Consecrated Hands API"}


@api_router.get("/config")
async def get_config():
    return {
        "stripe_enabled": bool(os.environ.get("STRIPE_SECRET_KEY")),
        "paypal_enabled": bool(os.environ.get("PAYPAL_CLIENT_ID")),
        "org_email": ORG_EMAIL,
    }


@api_router.post("/donations/checkout")
async def create_donation_checkout(req: DonationRequest):
    amount_cents = int(round(req.amount * 100))
    if amount_cents < 100:
        raise HTTPException(400, "Minimum donation is $1.00")
    recurring = req.frequency == "monthly"
    price_data = {
        "currency": "usd",
        "unit_amount": amount_cents,
        "product_data": {"name": "Monthly Donation" if recurring else "One-Time Donation"},
    }
    if recurring:
        price_data["recurring"] = {"interval": "month"}
    kwargs = dict(
        mode="subscription" if recurring else "payment",
        line_items=[{"price_data": price_data, "quantity": 1}],
        customer_email=req.donor_email,
        success_url=f"{req.origin_url}/donation/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{req.origin_url}/donate?canceled=true",
        metadata={"donor_name": req.donor_name, "donor_email": req.donor_email,
                  "frequency": req.frequency},
    )
    if not recurring:
        kwargs["submit_type"] = "donate"
    try:
        session = stripe.checkout.Session.create(**kwargs)
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {e}")
        raise HTTPException(502, "Payment provider error")

    await db.donations.insert_one({
        "id": str(uuid.uuid4()),
        "session_id": session.id,
        "donor_name": req.donor_name,
        "donor_email": req.donor_email,
        "amount": req.amount,
        "currency": "usd",
        "frequency": req.frequency,
        "status": "initiated",
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"checkout_url": session.url, "session_id": session.id}


async def _finalize_donation(record):
    """Send thank-you + org notification once, idempotently."""
    if record.get("emails_sent"):
        return
    await db.donations.update_one({"session_id": record["session_id"]},
                                  {"$set": {"emails_sent": True}})
    amt = f"${record['amount']:,.2f}"
    freq = "monthly" if record["frequency"] == "monthly" else "one-time"
    # Thank-you to donor
    await send_email(
        record["donor_email"],
        "Thank you for your gift to Consecrated Hands",
        f"""<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-family:Arial,sans-serif;color:#1A1814;padding:24px">
        <h2 style="color:#E6B038;font-weight:400">Thank you, {record['donor_name']}.</h2>
        <p>Your {freq} gift of <strong>{amt}</strong> helps guide young people spiritually, educationally, and financially as they overcome life's hardships.</p>
        <p>Consecrated Hands is a 501(c)(3) nonprofit organization. This letter serves as your receipt; your donation may be tax-deductible to the fullest extent allowed by law. No goods or services were provided in exchange for this contribution.</p>
        <p style="color:#6B665E">With gratitude,<br/>The Consecrated Hands Team</p>
        </td></tr></table>""",
        reply_to=ORG_EMAIL,
    )
    # Notify org
    await send_email(
        ORG_EMAIL,
        f"New {freq} donation: {amt}",
        f"<p><strong>{record['donor_name']}</strong> ({record['donor_email']}) gave a {freq} gift of <strong>{amt}</strong>.</p>",
        reply_to=record["donor_email"],
    )


@api_router.get("/payments/status/{session_id}")
async def get_status(session_id: str):
    record = await db.donations.find_one({"session_id": session_id}, {"_id": 0})
    if not record:
        raise HTTPException(404, "Transaction not found")
    if record.get("payment_status") != "paid":
        try:
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await db.donations.update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {"$set": {"status": "completed", "payment_status": "paid",
                              "updated_at": datetime.now(timezone.utc).isoformat()}})
                record = await db.donations.find_one({"session_id": session_id}, {"_id": 0})
                if record.get("payment_status") == "paid":
                    await _finalize_donation(record)
        except stripe.error.StripeError:
            pass
    return {"session_id": record["session_id"], "status": record["status"],
            "payment_status": record["payment_status"],
            "amount": record["amount"], "frequency": record["frequency"],
            "donor_name": record["donor_name"]}


@api_router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except Exception:
        raise HTTPException(400, "Invalid signature")
    obj, t = event["data"]["object"], event["type"]
    if t == "checkout.session.completed":
        await db.donations.update_one(
            {"session_id": obj["id"], "payment_status": {"$ne": "paid"}},
            {"$set": {"status": "completed", "payment_status": obj.get("payment_status", "paid"),
                      "updated_at": datetime.now(timezone.utc).isoformat()}})
        rec = await db.donations.find_one({"session_id": obj["id"]}, {"_id": 0})
        if rec and rec.get("payment_status") == "paid":
            await _finalize_donation(rec)
    return {"status": "ok"}


@api_router.post("/contact")
async def submit_contact(req: ContactRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "name": req.name, "email": req.email, "phone": req.phone,
        "interest": req.interest, "message": req.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.inquiries.insert_one(doc)
    labels = {"volunteer": "Volunteer", "mentor": "Mentor", "partner": "Partner", "general": "General Inquiry"}
    await send_email(
        ORG_EMAIL,
        f"New {labels[req.interest]} inquiry from {req.name}",
        f"""<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-family:Arial,sans-serif;color:#1A1814;padding:24px">
        <h3 style="color:#E6B038">New {labels[req.interest]} inquiry</h3>
        <p><strong>Name:</strong> {req.name}<br/>
        <strong>Email:</strong> {req.email}<br/>
        <strong>Phone:</strong> {req.phone or '—'}<br/>
        <strong>Interest:</strong> {labels[req.interest]}</p>
        <p><strong>Message:</strong><br/>{req.message}</p>
        </td></tr></table>""",
        reply_to=req.email,
    )
    return {"status": "success", "message": "Thank you — we'll be in touch soon."}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
