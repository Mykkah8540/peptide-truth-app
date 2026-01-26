# Risk UI (Pep-Talk)

This folder documents the Risk UI surface area.

## Status

Risk badge rendering is implemented in the Next.js app.

### Data Source
- `content/_index/risk_index_v1.json`

### Loader / Access
- `app/web/lib/riskIndex.ts`

### UI Component
- `app/web/components/RiskBadge.tsx`

### PDP Integration
- Peptide PDP: `app/web/app/peptide/[slug]/page.tsx`
- Blend PDP: `app/web/app/blend/[slug]/page.tsx`
- Badge is rendered via `IdentityPanel` when risk info is present.

## Governance

Risk presentation must:
- stay neutral and non-hyped
- avoid “medical report” clutter
- illuminate risk without fear framing
- never imply dosing, protocols, or medical authority
