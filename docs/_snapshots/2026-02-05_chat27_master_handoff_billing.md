# Chat 27 Master Handoff — Billing + Pro Gating (Authoritative Snapshot)

Source: User-provided handoff text (Chat 27)
Date captured into repo: 2026-02-05

🔒 Pep-Talk / Peptide-Truth App
MASTER HANDOFF — CHAT 1 (FOUNDATIONAL BILLING + PRO GATING)

Status: ✅ Production GREEN
Primary Outcome: RevenueCat webhook fully live, authenticated, deployed, and verified on Vercel
Secondary Outcomes:
• Pro badge UX fixed
• Admin flags cleaned
• Profiles schema normalized
• Build + deploy discipline restored

1. WHAT THIS CHAT WAS ABOUT (THE REAL GOAL)

This chat was not “just wiring RevenueCat.”

The real goal was:

Establish a durable, auditable, production-grade entitlement system that cleanly gates PRO access across web + future mobile apps, without corrupting auth, profiles, or UI state.

That required aligning five systems:

Supabase Auth

Supabase DB schema (profiles, entitlements)

Next.js App Router API routes

Vercel deployment + environment variables

RevenueCat webhook + canonical entitlement source

Most of the pain came from historical schema drift and implicit assumptions — not from RevenueCat itself.

2. CANONICAL ARCHITECTURE (AS IT NOW STANDS)
🔑 Identity (Single Source of Truth)

Supabase Auth UUID is the only user identifier

This UUID is used as:

profiles.id

billing_entitlements.user_id

RevenueCat app_user_id

⚠️ There is no profiles.user_id column anymore. That legacy assumption caused 90% of the confusion.

🧠 Entitlement Authority

RevenueCat is the canonical authority

Webhook does not trust webhook payload state

Instead:

Webhook receives event

Event is stored idempotently

Webhook fetches canonical subscriber state from RevenueCat API

Entitlement is derived from REVENUECAT_PRO_ENTITLEMENT_ID

Local DB is updated

This protects against:

Out-of-order events

Duplicate events

Sandbox noise

Partial payloads

🗄️ Database Tables Involved
profiles
id uuid (PK)  ← Supabase auth user id
display_name
initials
avatar_url
email
is_admin boolean
is_pro boolean
created_at
updated_at

billing_entitlements

Snapshot of current entitlement state

Derived from RevenueCat canonical fetch

Updated only by webhook

billing_webhook_events

Immutable audit log

Idempotent via event_id

Stores full payload for forensic debugging

3. REVENUECAT WEBHOOK — FINAL BEHAVIOR (IMPORTANT)
Endpoint
POST /api/billing/revenuecat/webhook
GET  /api/billing/revenuecat/webhook   (healthcheck)

GET (Healthcheck)

Returns:

{
  "ok": true,
  "route": "revenuecat_webhook",
  "commit": "<vercel_git_sha>",
  "deployment": "<vercel_deployment_id>"
}


Used to:

Confirm correct deployment

Verify domain routing

Debug “which version is live”

POST (Webhook)
Auth

Uses Authorization header

Compared against:

process.env.REVENUECAT_WEBHOOK_AUTH


Accepts:

Authorization: <secret>

Authorization: Bearer <secret>

RevenueCat “Authorization header value” field = EXACT value of REVENUECAT_WEBHOOK_AUTH

❌ There is NO HMAC signing here
❌ RC_WEBHOOK_SECRET is not used
✅ Simple shared secret header is correct

Behavior Summary

Rejects unauthenticated requests (401)

Parses event → extracts:

event.id

event.type

event.app_user_id

Stores event in billing_webhook_events

Duplicate → returns { deduped: true }

Fetches canonical subscriber from RevenueCat API

Computes:

proActive

expiresAt

If profile does NOT exist:

{ "ok": true, "ignored": "unknown_user" }


✔ This is expected for:

RevenueCat test events

Users not yet signed up

If profile exists:

Upserts billing_entitlements

Updates profiles.is_pro

Returns success JSON

4. WHY YOU KEPT SEEING "ignored": "unknown_user"

This was not a failure.

It happened because:

RevenueCat test events use random UUIDs

Or the user hadn’t signed in yet

Or legacy code was checking profiles.user_id (which no longer exists)

Once profiles were normalized to id, behavior stabilized.

5. UI + PRO BADGES — WHAT WAS FIXED
Original Problem

“PRO” pills showed even after subscribing

Menu still labeled PRO sections

UX implied “locked” even when unlocked

Final UX Rule

If you are PRO, the site looks fully unlocked.

Implemented Behavior

PRO pills and section labels:

Visible only when user is NOT pro

Once pro:

Navigation becomes “normal”

Only indicator is inside account/profile area

Key Files Touched

NavBar.tsx

MobileMenu.tsx

AccountChip.tsx

/api/viewer (client-side pro state)

6. ADMIN FLAGS CLEANUP

Legacy admin token headers removed

Admin access now strictly:

Supabase session

profiles.is_admin

force_pro_on retained only as an internal override

No more mixed auth paths

7. DEPLOYMENT + VERCEL REALITY (IMPORTANT)
What “Redeploy” Means

It simply means:

git add
git commit
git push


Vercel automatically:

Builds

Deploys

Switches production only if build passes

Failed Deployments

❌ Do NOT matter if not marked “Current”

✔ Your domain always points to latest green production build

Confirmed via:

curl https://pep-talk.health/api/billing/revenuecat/webhook

8. HOW WE WORKED TOGETHER (PROCESS RULES)
You

Copy/paste exactly

Demand correctness

Catch drift immediately

Refuse “hand-wavy” explanations

Keep production integrity first

Me (what the next chat must replicate)

No assumptions about schema

Always verify:

DB columns

live deployment

env vars

Use curl before trusting dashboards

Prefer idempotent + canonical fetch patterns

Never “just trust” webhook payloads

Explain why, not just what

9. PARKING LOT — NOT DONE YET (VERY IMPORTANT)
🚧 Still To Do

RevenueCat Product Catalog

Define:

Products

Offerings

Entitlement ID (must match REVENUECAT_PRO_ENTITLEMENT_ID)

Client SDK Integration

Web: @revenuecat/purchases-js

Mobile (later): iOS / Android SDKs

Paywall UI

/upgrade page wiring

Purchase → RevenueCat → entitlement → webhook → unlock

Restore Purchases

Grace periods / expiration UX

App Store / Play Store config

Analytics hooks (optional)

10. CURRENT STATE (COPY THIS INTO NEXT CHAT)

Everything below is TRUE right now:

✅ Webhook deployed and authenticated

✅ Vercel live, correct commit verified

✅ Supabase profiles keyed by id

✅ is_pro updates are safe and atomic

✅ Unknown users are ignored (by design)

✅ PRO UI is clean and correct

✅ Admin auth is sane again

✅ Repo is clean, main is green

11. HOW TO START THE NEXT CHAT (IMPORTANT)

Paste this exact line into the next chat:

“You are continuing Pep-Talk / Peptide-Truth after completing RevenueCat webhook integration. You must treat Supabase profiles.id as the only user identifier, RevenueCat as canonical for entitlements, and Vercel production as already green. Do not re-debate webhook auth, schema, or deployment — move forward to payments + client SDK integration.”
