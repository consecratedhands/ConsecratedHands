# Consecrated Hands

Official website for **Consecrated Hands**, a federally recognized 501(c)(3) Christ-centered youth mentorship nonprofit.

Production site: https://consecratedhands.com

## Current architecture

- **Frontend:** React 19, React Router, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend:** FastAPI
- **Database:** MongoDB via Motor
- **Donations:** Stripe Checkout (one-time and monthly)
- **Email notifications:** configured server-side through the deployment environment
- **SEO:** page-specific metadata, canonical URLs, Open Graph/Twitter metadata, XML sitemap, robots.txt, Organization JSON-LD

## Main website routes

- `/` — Home
- `/about` — About
- `/mission` — Mission
- `/mentorship` — Web of Consecration™
- `/volunteer` — Volunteer / mentor information
- `/prayer` — Prayer requests
- `/contact` — Contact / application interest
- `/donate` — Donations
- `/privacy` — Privacy Policy
- `/terms` — Terms of Use
- `/safeguarding` — Youth Safeguarding Commitment

## Brand system

The current V3 brand uses:

- White base
- Sky/baby blue accents
- Bright, luminous polished-gold accents
- Neutral charcoal text/backgrounds — no navy
- Cormorant Garamond headings
- Inter body text

The official master logo is stored at:

`frontend/public/img/CONSECRATED HANDS LOGO.png`

The master PNG stays untouched. The production UI serves the optimized
`frontend/public/img/consecrated-hands-logo.webp` copy for faster mobile loads.
Do not replace either with older `logo.png` / `logo.webp` assets.

## Local frontend

```bash
cd frontend
cp .env.example .env
corepack yarn install --frozen-lockfile
corepack yarn start
```

Production build:

```bash
cd frontend
corepack yarn build
```

## Local backend

Create a virtual environment, install `backend/requirements.txt`, copy `backend/.env.example` to `backend/.env`, and fill in your own private values.

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn backend.server:app --reload
```

Never commit real Stripe keys, database credentials, email keys, or other secrets.

## Required production configuration

Frontend:

- `REACT_APP_BACKEND_URL`
- `REACT_APP_SITE_URL`
- `REACT_APP_STRIPE_PAYMENT_LINK` is optional and is used only as a fallback when no backend URL is configured.

Backend:

- `MONGO_URL`
- `DB_NAME`
- `STRIPE_SECRET_KEY` (prefer a least-privilege restricted key)
- `STRIPE_WEBHOOK_SECRET`
- `EMERGENT_EMAIL_KEY` if using the current email integration
- `ORG_EMAIL`
- `SITE_URL`
- `CORS_ORIGINS`

## Donation architecture

When `REACT_APP_BACKEND_URL` is configured, the website uses the FastAPI backend to create Stripe Checkout Sessions. The server controls the trusted success/cancel URLs. The browser does not supply a trusted return origin.

The generic Stripe payment link is only a fallback for deployments where the backend is unavailable; in that mode, the website does not display custom amount/frequency controls that it cannot transmit.

## Safety and privacy

The public site includes a Privacy Policy, Terms of Use, and Youth Safeguarding Commitment. Contact and prayer APIs include field-size validation, honeypot fields, HTML escaping for email content, restricted CORS defaults, and basic request rate limiting.

Operational safeguarding practices must match the public commitments published on the website.

## Testing

Pull requests run the GitHub Actions production-build check in `.github/workflows/ci.yml`.

Before merging a major design or integration change, also verify manually on desktop and mobile:

1. Every navigation route
2. Mobile menu open/close behavior
3. Contact form
4. Prayer form
5. One-time donation flow
6. Monthly donation flow
7. Donation cancel flow
8. Donation success confirmation
9. Keyboard navigation / visible focus
10. Direct loading of nested routes on the production host

## Change policy

Make significant work on a feature branch and merge through a pull request. Keep `main` deployable.
