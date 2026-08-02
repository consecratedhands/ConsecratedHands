# Consecrated Hands — PRD

## Problem Statement
Responsive website for Consecrated Hands, a Christ-centered 501(c)(3) youth mentorship
program guiding young people spiritually, educationally, and financially. Elegant,
faith-centered, minimalist (white base, warm yellow, baby-blue). Pages: Home, About,
Programs, Contact/Get Involved, Donation (one-time + recurring). Mobile-friendly,
accessible, easy to update, basic SEO.

## Stack & Architecture
- Frontend: React 19, react-router, framer-motion, lenis (smooth scroll), react-fast-marquee, Tailwind, shadcn/ui, sonner.
- Backend: FastAPI + MongoDB (motor). All routes /api prefixed.
- Content centralized in /app/frontend/src/lib/content.js (edit copy here).
- Design tokens in tailwind.config.js (ink/cream/gold/sky/stone) + index.css.

## Integrations
- Stripe (Emergent claimable sandbox) — donation checkout, one-time (mode=payment) + monthly (subscription), custom/suggested amounts. No Stripe Tax applied (charitable gifts are non-taxable). Onboarding URL to claim account provided to user.
- Resend (Emergent-managed) — email on donation (donor thank-you receipt + org notification) and contact form (org notification). Sends to ConsecratedHands@Gmail.com.
- PayPal — NOT active. Requires user's PayPal Client ID + Secret. Deferred.

## Backend Endpoints
- GET /api/config
- POST /api/donations/checkout
- GET /api/payments/status/{session_id}
- POST /api/stripe/webhook
- POST /api/contact

## Implemented (2026-08-02)
- Home: kinetic hero (masked line reveal + parallax), mission statement, 6-program grid, impact stats, editorial marquee, donate CTA.
- About: parallax stained-glass hero, mission, numbered value chapters (sticky), 501(c)(3) trust block.
- Programs: 6 alternating editorial image/text blocks + CTA.
- Get Involved: contact form (volunteer/mentor/partner/general) + direct contact card. Saves to Mongo (inquiries) + emails org.
- Donate: one-time/monthly toggle, suggested + custom amounts, donor fields, tax-deductible messaging, Stripe checkout redirect, success page with status polling.
- SEO: per-page title/meta, og tags, semantic structure.

## Backlog
- P1: Activate PayPal once user provides Client ID + Secret.
- P1: Admin view for inquiries + donation records.
- P2: Impact stories / testimonials, newsletter signup, blog/updates.

## Enhancement (2026-08-02) — Premium Redesign v2
- Fonts switched to Playfair Display (headings) + Inter (body). Added Dancing Script (unused fallback).
- Official logo added to header + footer (gold Bible/cross script).
- Restructured to 8 pages: Home, About, Our Mission (/mission), Mentorship (/mentorship), Volunteer (/volunteer), Donate, Prayer (/prayer), Contact.
- Replaced "6 ways" with THE 5 PILLARS: Faith, Family, Finance, Fitness, Future (content.js PILLARS).
- Added the Truth message across Home/Mission/Mentorship: "We show them the lies (they aren't enough) and tell them the Truth — Jesus' truth."
- Home additions: full-width sunlight hero w/ parallax + glass CTA, Truth section, 5 Pillars grid, animated impact counters (Youth Mentored 250+, Volunteer Hours 4800+, Families Served 120+, Community Events 36), testimonials, upcoming events, final CTA. Glassmorphism, rounded-3xl cards, light glows.
- New backend endpoint: POST /api/prayer (saves to Mongo `prayers` + emails org). Contact interests extended with `mentee`.
- New components: Counter.js (animated), ApplicationForm.js (reusable), updated Layout.js (logo/nav/social footer).
- Testing: iteration_1.json — backend 15/15, frontend 100%, 0 console errors, no bugs.

## Backlog (updated)
- P1: Activate PayPal (needs user's PayPal Client ID + Secret).
- P1: Admin dashboard for inquiries / donations / prayer requests.
- P2: Public prayer wall (is_public prayers), real event calendar, blog/updates.
