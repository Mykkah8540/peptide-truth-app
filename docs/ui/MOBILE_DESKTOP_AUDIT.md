# Mobile and Desktop Audit
Purpose
A repeatable audit checklist to keep UI consistent.

Mobile must
- Read as one clean scroll where intended
- Avoid nested scroll regions
- Avoid sticky containers that trap content

Desktop must
- Use space intentionally
- Avoid dead rails and giant empty areas

Must not
- Janky layout shifts
- Sticky sidebars that create scroll traps

Verify
- npm -C app/web run build
