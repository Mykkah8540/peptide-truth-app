# Routes and Navigation Contract
This file is authoritative.

Purpose
Prevent route drift and nav freelancing.
UI copy may change without route changes.

Primary pillars
- Peptides
- Resources
- Commercial Blends
- Explore Stacks
- Wellness Paths

Navigation invariants
- All primary pillars are visible in navigation.
- Pro pills appear only when user is not Pro.
- Clicking Pro-gated features when not Pro routes to upgrade with next preserved.
- My Peps exists only in the avatar menu.
- Logged-in avatar menu includes Account, My Peps, Logout.
- Logout occurs only via supabase auth sign out, never a direct route.

Account surfaces
- Account route exists for overview and status.
- Subscription management exists and is reachable from account.

Rule
If a proposed change alters routes, it must first update this contract and be explicitly approved.
