import asyncio
import os
from types import SimpleNamespace

import pytest
from pydantic import ValidationError
from starlette.requests import Request

os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "test_consecrated_hands")

from backend import server


def test_donation_amount_must_be_finite():
    with pytest.raises(ValidationError):
        server.DonationRequest(
            amount=float("nan"),
            donor_name="Test Donor",
            donor_email="donor@example.com",
        )


def test_complete_but_unpaid_checkout_is_not_confirmed(monkeypatch):
    class Donations:
        def __init__(self):
            self.updated = False

        async def find_one(self, *_args, **_kwargs):
            return {"status": "initiated", "payment_status": "pending"}

        async def update_one(self, *_args, **_kwargs):
            self.updated = True

    donations = Donations()
    checkout_sessions = SimpleNamespace(
        retrieve=lambda _session_id: SimpleNamespace(status="complete", payment_status="unpaid")
    )
    fake_stripe = SimpleNamespace(v1=SimpleNamespace(checkout=SimpleNamespace(sessions=checkout_sessions)))
    monkeypatch.setattr(server, "db", SimpleNamespace(donations=donations))
    monkeypatch.setattr(server, "stripe_client", fake_stripe)
    monkeypatch.setattr(server, "STRIPE_SECRET_KEY", "sk_test_placeholder")
    server._RATE_BUCKETS.clear()

    request = Request({
        "type": "http",
        "method": "GET",
        "path": "/api/payments/status/cs_test",
        "headers": [],
        "client": ("127.0.0.1", 5000),
    })
    result = asyncio.run(server.get_status("cs_test", request))

    assert result == {"status": "initiated", "payment_status": "pending"}
    assert donations.updated is False
