from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
import stripe
from stripe import StripeClient
import html
import time
import secrets
import string
from collections import defaultdict, deque
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, Literal
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Core configuration
SITE_URL = os.environ.get("SITE_URL", "https://consecratedhands.com").rstrip("/")
ORG_EMAIL = os.environ.get("ORG_EMAIL", "OurConsecratedHands@Gmail.com")

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe
STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY", "")
stripe_client = StripeClient(STRIPE_SECRET_KEY) if STRIPE_SECRET_KEY else None
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
STRIPE_INTEGRATION_ID = "consecrated-hands-" + "".join(
    secrets.choice(string.ascii_lowercase) for _ in range(8)
)

# Email (Emergent managed Resend)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Consecrated Hands")

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Lightweight in-process abuse protection. Production infrastructure can add an
# upstream rate limiter later, but this prevents unlimited anonymous form spam now.
_RATE_BUCKETS = defaultdict(deque)


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _rate_limit(request: Request, bucket: str, limit: int, window_seconds: int):
    key = f"{bucket}:{_client_ip(request)}"
    now = time.monotonic()
    q = _RATE_BUCKETS[key]
    while q and now - q[0] > window_seconds:
        q.popleft()
    if len(q) >= limit:
        raise HTTPException(429, "Too many requests. Please try again shortly.")
    q.append(now)


def _clean(value: Optional[str]) -> str:
    return (value or "").strip()


def _safe(value: Optional[str]) -> str:
    return html.escape(_clean(value), quote=True)


# ---------------- Models ----------------
class DonationRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    amount: float = Field(..., ge=1, le=100000)
    frequency: Literal["one_time", "monthly"] = "one_time"
    donor_name: str = Field(..., min_length=1, max_length=120)
    donor_email: EmailStr
    # Kept optional for backward compatibility, but intentionally not trusted.
    origin_url: Optional[str] = None
    website: Optional[str] = Field(default="", max_length=200)


class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    interest: Literal["volunteer", "mentor", "mentee", "partner", "general"] = "general"
    message: str = Field(..., min_length=2, max_length=5000)
    website: Optional[str] = Field(default="", max_length=200)


class PrayerRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: Optional[str] = Field(default="", max_length=120)
    email: Optional[EmailStr] = None
    request: str = Field(..., min_length=2, max_length=5000)
    is_public: bool = False
    website: Optional[str] = Field(default="", max_length=200)


# ---------------- Email helper ----------------
async def send_email(to: str, subject: str, html_body: str, reply_to: Optional[str] = None) -> bool:
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing; email not sent")
        return False
    payload = {"to": [to], "subject": subject, "html": html_body, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as c:
            resp = await c.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Email send error: {e}")
        return False


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Consecrated Hands API"}


@api_router.get("/config")
async def get_config():
    return {
        "stripe_enabled": bool(STRIPE_SECRET_KEY),
        "paypal_enabled": bool(os.environ.get("PAYPAL_CLIENT_ID")),
        "org_email": ORG_EMAIL,
        "site_url": SITE_URL,
    }


@api_router.post("/donations/checkout")
async def create_donation_checkout(req: DonationRequest, request: Request):
    _rate_limit(request, "donation", limit=12, window_seconds=600)
    if _clean(req.website):
        raise HTTPException(400, "Invalid submission")
    if not STRIPE_SECRET_KEY:
        raise HTTPException(503, "Online giving is temporarily unavailable")

    amount_cents = int(round(req.amount * 100))
    recurring = req.frequency == "monthly"
    price_data = {
        "currency": "usd",
        "unit_amount": amount_cents,
        "product_data": {"name": "Monthly Donation" if recurring else "One-Time Donation"},
    }
    if recurring:
        price_data["recurring"] = {"interval": "month"}

    donor_name = _clean(req.donor_name)
    kwargs = dict(
        mode="subscription" if recurring else "payment",
        line_items=[{"price_data": price_data, "quantity": 1}],
        customer_email=str(req.donor_email),
        success_url=f"{SITE_URL}/donation/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{SITE_URL}/donate?canceled=true",
        metadata={
            "donor_name": donor_name,
            "donor_email": str(req.donor_email),
            "frequency": req.frequency,
        },
        integration_identifier=STRIPE_INTEGRATION_ID,
    )
    if not recurring:
        kwargs["submit_type"] = "donate"

    try:
        session = stripe_client.v1.checkout.sessions.create(kwargs)
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {e}")
        raise HTTPException(502, "Payment provider error")

    await db.donations.insert_one({
        "id": str(uuid.uuid4()),
        "session_id": session.id,
        "subscription_id": getattr(session, "subscription", None),
        "donor_name": donor_name,
        "donor_email": str(req.donor_email),
        "amount": req.amount,
        "currency": "usd",
        "frequency": req.frequency,
        "status": "initiated",
        "payment_status": "pending",
        "donor_receipt_sent": False,
        "org_notification_sent": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"checkout_url": session.url, "session_id": session.id}


async def _finalize_donation(record):
    """Send donor and organization emails independently and retry safely."""
    amt = f"${record['amount']:,.2f}"
    freq = "monthly" if record["frequency"] == "monthly" else "one-time"
    safe_name = _safe(record.get("donor_name"))
    safe_email = _safe(record.get("donor_email"))

    if not record.get("donor_receipt_sent"):
        sent = await send_email(
            record["donor_email"],
            "Thank you for your gift to Consecrated Hands",
            f"""<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-family:Arial,sans-serif;color:#1A1814;padding:24px">
            <h2 style="color:#B88712;font-weight:400">Thank you, {safe_name}.</h2>
            <p>Your {freq} gift of <strong>{amt}</strong> helps provide Christ-centered mentorship, educational support, life-skills development, career exposure, and community experiences for young people.</p>
            <p>Consecrated Hands is a federally recognized 501(c)(3) public charity. This message serves as an acknowledgment of your contribution. No goods or services were provided in exchange for this contribution.</p>
            <p style="color:#5B6F7C">With gratitude,<br/>The Consecrated Hands Team</p>
            </td></tr></table>""",
            reply_to=ORG_EMAIL,
        )
        if sent:
            await db.donations.update_one(
                {"session_id": record["session_id"]},
                {"$set": {"donor_receipt_sent": True}},
            )

    if not record.get("org_notification_sent"):
        sent = await send_email(
            ORG_EMAIL,
            f"New {freq} donation: {amt}",
            f"<p><strong>{safe_name}</strong> ({safe_email}) gave a {freq} gift of <strong>{amt}</strong>.</p>",
            reply_to=record["donor_email"],
        )
        if sent:
            await db.donations.update_one(
                {"session_id": record["session_id"]},
                {"$set": {"org_notification_sent": True}},
            )


async def _record_recurring_invoice(invoice):
    """Record and acknowledge successful monthly renewal invoices once."""
    if invoice.get("billing_reason") != "subscription_cycle":
        return
    subscription_id = invoice.get("subscription")
    invoice_id = invoice.get("id")
    if not subscription_id or not invoice_id:
        return

    parent = await db.donations.find_one({"subscription_id": subscription_id}, {"_id": 0})
    if not parent:
        logger.warning(f"Recurring invoice {invoice_id} has no matching donation subscription")
        return

    existing = await db.donation_payments.find_one({"invoice_id": invoice_id}, {"_id": 0, "id": 1})
    if existing:
        return

    amount = (invoice.get("amount_paid") or 0) / 100
    now = datetime.now(timezone.utc).isoformat()
    await db.donation_payments.insert_one({
        "id": str(uuid.uuid4()),
        "invoice_id": invoice_id,
        "subscription_id": subscription_id,
        "session_id": parent.get("session_id"),
        "donor_name": parent.get("donor_name"),
        "donor_email": parent.get("donor_email"),
        "amount": amount,
        "currency": invoice.get("currency", "usd"),
        "frequency": "monthly",
        "payment_status": "paid",
        "created_at": now,
    })
    await db.donations.update_one(
        {"subscription_id": subscription_id},
        {"$set": {"status": "active", "payment_status": "paid", "updated_at": now}},
    )

    safe_name = _safe(parent.get("donor_name"))
    safe_email = _safe(parent.get("donor_email"))
    amt = f"${amount:,.2f}"
    await send_email(
        parent["donor_email"],
        "Thank you for your monthly gift to Consecrated Hands",
        f"""<p>Thank you, {safe_name}. Your monthly gift of <strong>{amt}</strong> was received.</p>
        <p>Consecrated Hands is a federally recognized 501(c)(3) public charity. No goods or services were provided in exchange for this contribution.</p>""",
        reply_to=ORG_EMAIL,
    )
    await send_email(
        ORG_EMAIL,
        f"Monthly donation received: {amt}",
        f"<p><strong>{safe_name}</strong> ({safe_email}) gave a recurring monthly gift of <strong>{amt}</strong>.</p>",
        reply_to=parent["donor_email"],
    )


@api_router.get("/payments/status/{session_id}")
async def get_status(session_id: str, request: Request):
    _rate_limit(request, "payment-status", limit=40, window_seconds=600)
    record = await db.donations.find_one({"session_id": session_id}, {"_id": 0})
    if not record:
        raise HTTPException(404, "Transaction not found")
    if record.get("payment_status") != "paid" and STRIPE_SECRET_KEY:
        try:
            s = stripe_client.v1.checkout.sessions.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await db.donations.update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {"$set": {
                        "status": "completed",
                        "payment_status": "paid",
                        "subscription_id": getattr(s, "subscription", None),
                        "updated_at": datetime.now(timezone.utc).isoformat(),
                    }},
                )
                record = await db.donations.find_one({"session_id": session_id}, {"_id": 0})
                if record.get("payment_status") == "paid":
                    await _finalize_donation(record)
        except stripe.error.StripeError as e:
            logger.warning(f"Stripe status lookup failed for {session_id}: {e}")
    # Keep the public confirmation response intentionally minimal. The Checkout
    # Session ID is a reference, not authorization to expose donor details.
    return {
        "status": record["status"],
        "payment_status": record["payment_status"],
    }


@api_router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    if not STRIPE_WEBHOOK_SECRET:
        raise HTTPException(503, "Webhook is not configured")
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except Exception:
        raise HTTPException(400, "Invalid signature")

    # Stripe SDK v15 models are typed objects rather than dict subclasses.
    # Convert the verified event before using the existing dictionary helpers.
    event_data = event.to_dict() if hasattr(event, "to_dict") else event
    obj, event_type = event_data["data"]["object"], event_data["type"]

    if event_type == "checkout.session.completed":
        await db.donations.update_one(
            {"session_id": obj["id"]},
            {"$set": {
                "status": "completed",
                "payment_status": obj.get("payment_status", "paid"),
                "subscription_id": obj.get("subscription"),
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }},
        )
        rec = await db.donations.find_one({"session_id": obj["id"]}, {"_id": 0})
        if rec and rec.get("payment_status") == "paid":
            await _finalize_donation(rec)

    elif event_type == "invoice.paid":
        await _record_recurring_invoice(obj)

    elif event_type == "invoice.payment_failed":
        subscription_id = obj.get("subscription")
        if subscription_id:
            await db.donations.update_one(
                {"subscription_id": subscription_id},
                {"$set": {
                    "status": "payment_failed",
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                }},
            )

    elif event_type == "customer.subscription.deleted":
        await db.donations.update_one(
            {"subscription_id": obj.get("id")},
            {"$set": {
                "status": "canceled",
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }},
        )

    return {"status": "ok"}


@api_router.post("/contact")
async def submit_contact(req: ContactRequest, request: Request):
    _rate_limit(request, "contact", limit=6, window_seconds=600)
    if _clean(req.website):
        raise HTTPException(400, "Invalid submission")

    doc = {
        "id": str(uuid.uuid4()),
        "name": _clean(req.name),
        "email": str(req.email),
        "phone": _clean(req.phone),
        "interest": req.interest,
        "message": _clean(req.message),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.inquiries.insert_one(doc)
    labels = {
        "volunteer": "Volunteer",
        "mentor": "Mentor",
        "mentee": "Mentorship Applicant",
        "partner": "Partner",
        "general": "General Inquiry",
    }
    await send_email(
        ORG_EMAIL,
        f"New {labels[req.interest]} inquiry from {_clean(req.name)}",
        f"""<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-family:Arial,sans-serif;color:#1A1814;padding:24px">
        <h3 style="color:#B88712">New {labels[req.interest]} inquiry</h3>
        <p><strong>Name:</strong> {_safe(req.name)}<br/>
        <strong>Email:</strong> {_safe(str(req.email))}<br/>
        <strong>Phone:</strong> {_safe(req.phone) or '—'}<br/>
        <strong>Interest:</strong> {labels[req.interest]}</p>
        <p><strong>Message:</strong><br/>{_safe(req.message).replace(chr(10), '<br/>')}</p>
        </td></tr></table>""",
        reply_to=str(req.email),
    )
    return {"status": "success", "message": "Thank you — we'll be in touch soon."}


@api_router.post("/prayer")
async def submit_prayer(req: PrayerRequest, request: Request):
    _rate_limit(request, "prayer", limit=6, window_seconds=600)
    if _clean(req.website):
        raise HTTPException(400, "Invalid submission")

    email_value = str(req.email) if req.email else ""
    doc = {
        "id": str(uuid.uuid4()),
        "name": _clean(req.name) or "Anonymous",
        "email": email_value,
        "request": _clean(req.request),
        "is_public": req.is_public,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.prayers.insert_one(doc)
    await send_email(
        ORG_EMAIL,
        f"New prayer request from {doc['name']}",
        f"""<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-family:Arial,sans-serif;color:#1A1814;padding:24px">
        <h3 style="color:#B88712">A new prayer request has come in</h3>
        <p><strong>From:</strong> {_safe(doc['name'])}{f" ({_safe(email_value)})" if email_value else ""}<br/>
        <strong>Share publicly:</strong> {"Yes" if req.is_public else "No"}</p>
        <p style="white-space:pre-wrap">{_safe(req.request)}</p>
        </td></tr></table>""",
        reply_to=email_value or None,
    )
    return {"status": "success", "message": "Thank you — our team will be praying for you."}


app.include_router(api_router)

cors_origins = [
    origin.strip()
    for origin in os.environ.get(
        "CORS_ORIGINS",
        f"{SITE_URL},https://www.consecratedhands.com",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=cors_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
