# Consecrated Hands — Current Website PRD

_Last updated: August 29, 2026_

## Purpose

Consecrated Hands is a federally recognized 501(c)(3) Christ-centered youth mentorship nonprofit. The website should communicate credibility, warmth, faith, responsible stewardship, youth safety, and a clear path to mentorship, volunteering, prayer, partnership, and giving.

Primary message: **Become Who God Set You Apart to Be.**

## Current brand system

- White background
- Bright sky / baby-blue accents
- Bright, luminous polished-gold accents
- Neutral charcoal text and dark sections (no navy)
- Cormorant Garamond headings
- Inter body text
- Spacious, premium, minimal layout
- Rounded cards and subtle shadows
- Accessible contrast variants for small text/buttons

Official master logo:

`frontend/public/img/CONSECRATED HANDS LOGO.png`

The master PNG remains untouched. The website serves the optimized copy at
`frontend/public/img/consecrated-hands-logo.webp` for faster mobile loading.

Do not revert to older logo assets without explicit approval.

## Mission

Consecrated Hands is a Christ-centered youth mentorship nonprofit helping young people discover who God created them to become through faith, stability, education, life skills, opportunity, healthy relationships, character, leadership, and service.

## The Web of Consecration™

The current seven-strand framework is:

1. Faith & Identity
2. Stability & Essential Needs
3. Education & Development
4. Life & Financial Skills
5. Career & Opportunity
6. Health, Relationships & Character
7. Service, Leadership & Giving Back

The goal is whole-life mentorship rather than treating one need in isolation.

## Current routes

- `/` Home
- `/about` About
- `/mission` Our Mission
- `/mentorship` The Web of Consecration™
- `/volunteer` Volunteer / Mentor
- `/prayer` Prayer Requests
- `/contact` Contact
- `/donate` Donate
- `/donation/success` Stripe confirmation
- `/privacy` Privacy Policy
- `/terms` Terms of Use
- `/safeguarding` Youth Safeguarding Commitment

## Frontend architecture

- React 19
- React Router
- Tailwind CSS
- Framer Motion
- shadcn/ui components where useful
- Sonner notifications
- Central organization/program content in `frontend/src/lib/content.js`
- Shared shell in `frontend/src/components/Layout.js`
- SEO metadata/JSON-LD in `frontend/src/components/Seo.js`

Accessibility requirements:

- Keep visible keyboard focus
- Preserve skip navigation
- Honor reduced-motion preferences
- Do not use white text on the light sky-blue CTA background
- Use contrast-safe deeper gold or charcoal variants for small text
- Associate form labels with fields
- Preserve clear error/success messaging

## Backend architecture

- FastAPI
- MongoDB / Motor
- Stripe Checkout
- Email notifications through deployment-configured provider

Core API routes:

- `GET /api/`
- `GET /api/config`
- `POST /api/donations/checkout`
- `GET /api/payments/status/{session_id}`
- `POST /api/stripe/webhook`
- `POST /api/contact`
- `POST /api/prayer`

Production requirements:

- Never use a hardcoded test Stripe key fallback
- Server controls trusted success/cancel URLs
- Restrict CORS to approved origins
- Preserve form field-size limits, HTML escaping, honeypot handling, and rate limiting
- Keep secret values in deployment environment variables only
- Organization email is `OurConsecratedHands@Gmail.com` unless explicitly changed

## Donation experience

Primary mode:

- User chooses one-time or monthly
- User selects suggested/custom amount
- User enters name/email
- Frontend requests a Stripe Checkout Session from FastAPI
- Backend creates Stripe session with trusted site URL
- Stripe redirects back to `/donation/success`
- Backend verifies status and handles organization/donor notifications

Fallback mode:

- A generic Stripe Payment Link may be used only when no backend URL is configured
- In fallback mode do not show custom controls that cannot actually be transmitted

## Privacy and safeguarding

The site collects contact information, volunteer/mentorship interest, prayer requests, and donation information. Public trust pages must remain linked in the footer.

Sensitive form contents should not be intentionally recorded by analytics/session-recording tools.

Operational youth practices should match the public Youth Safeguarding Commitment.

## SEO

Maintain:

- Canonical URLs
- Per-page title/description
- Open Graph/Twitter metadata
- Organization JSON-LD with `Nonprofit501c3`
- `robots.txt`
- `sitemap.xml`
- `noindex` for 404 pages

Never publish fake impact statistics, testimonials, events, or grant claims. `IMPACT`, `TESTIMONIALS`, and `EVENTS` should remain empty until verified information is available.

## Current priorities after Phase 1 hardening

### P1

- Verify production environment variables and Stripe webhook configuration
- Perform real one-time and monthly Stripe test transactions in the intended production/staging environment
- Confirm deep-link routing is configured correctly on the production host
- Produce an optimized web copy of the official logo while keeping the master PNG untouched

### P2

- Add verified impact figures when available
- Add real testimonials with permission
- Add authentic program/event photography with appropriate releases
- Add board/leadership and governance transparency information
- Add annual reports / Form 990 / determination-letter transparency when appropriate
- Add newsletter/news updates if there is a real publishing process

### P3

- Admin dashboard for authorized review of inquiries, donations, and prayer requests
- Public event/calendar capability
- Carefully moderated public prayer-wall capability only if operational privacy/safeguarding processes support it

## Testing policy

Significant work should happen on a feature branch and merge through a pull request. CI must pass before merge.

Manual release smoke test should cover desktop and mobile navigation, direct nested routes, Contact, Prayer, one-time donation, monthly donation, donation cancellation, donation success confirmation, keyboard focus, and responsive layout.
