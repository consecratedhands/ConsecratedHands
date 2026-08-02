"""Backend API tests for Consecrated Hands"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://purposeful-youth.preview.emergentagent.com").rstrip("/")
# Fallback: read from frontend .env if not set
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL"):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Basic ---
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


def test_config(client):
    r = client.get(f"{API}/config")
    assert r.status_code == 200
    data = r.json()
    assert data["stripe_enabled"] is True
    assert data["paypal_enabled"] is False
    assert "org_email" in data


# --- Donations / Stripe ---
def test_donation_one_time(client):
    payload = {
        "amount": 50,
        "frequency": "one_time",
        "donor_name": "TEST Donor",
        "donor_email": "test@example.com",
        "origin_url": BASE_URL,
    }
    r = client.post(f"{API}/donations/checkout", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "checkout_url" in data and data["checkout_url"].startswith("https://checkout.stripe.com")
    assert "session_id" in data


def test_donation_monthly(client):
    payload = {
        "amount": 25,
        "frequency": "monthly",
        "donor_name": "TEST Monthly",
        "donor_email": "monthly@example.com",
        "origin_url": BASE_URL,
    }
    r = client.post(f"{API}/donations/checkout", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["checkout_url"].startswith("https://checkout.stripe.com")


def test_donation_min_amount(client):
    payload = {
        "amount": 0.5,
        "frequency": "one_time",
        "donor_name": "TEST Low",
        "donor_email": "low@example.com",
        "origin_url": BASE_URL,
    }
    r = client.post(f"{API}/donations/checkout", json=payload)
    assert r.status_code == 400


def test_payment_status_not_found(client):
    r = client.get(f"{API}/payments/status/cs_test_doesnotexist_12345")
    assert r.status_code == 404


# --- Contact ---
@pytest.mark.parametrize("interest", ["volunteer", "mentor", "mentee", "partner", "general"])
def test_contact_interests(client, interest):
    payload = {
        "name": f"TEST {interest}",
        "email": f"{interest}@example.com",
        "phone": "555-0100",
        "interest": interest,
        "message": f"Testing {interest} interest.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    assert r.json().get("status") == "success"


def test_contact_invalid_email(client):
    r = client.post(f"{API}/contact", json={
        "name": "TEST", "email": "not-an-email",
        "interest": "general", "message": "hi"
    })
    assert r.status_code == 422


# --- Prayer ---
def test_prayer_full(client):
    r = client.post(f"{API}/prayer", json={
        "name": "TEST Prayer",
        "email": "pray@example.com",
        "request": "Please pray for our youth.",
        "is_public": True,
    })
    assert r.status_code == 200
    assert r.json().get("status") == "success"


def test_prayer_anonymous(client):
    r = client.post(f"{API}/prayer", json={"request": "Anonymous prayer.", "is_public": False})
    assert r.status_code == 200
    assert r.json().get("status") == "success"


def test_prayer_missing_request(client):
    r = client.post(f"{API}/prayer", json={"name": "x"})
    assert r.status_code == 422
