cat <<'EOF' > docs/app_state/app_state_v1.md
# Pep-Talk App State (v1)

Status: Authoritative (sub-constitutional)
Visibility: Internal / Private
Owner & Final Authority: Micah Carroll
Last Updated: 2026-01-19

Purpose:
Defines the v1 local-only persistence format for user state (Favorites, Stacks, Recent views).
This is a DATA CONTRACT. UI implementations must not guess.

Non-negotiables:
- Local-only v1 (device storage). No cloud sync requirements.
- No medical protocols, dosing, or regimens stored or generated.
- Entities referenced must deep-link via entity_key: "<kind>:<slug>"

## 1) Canonical Entity Key

entity_key format:
- "peptide:<slug>"
- "blend:<slug>"

Examples:
- "peptide:bpc-157"
- "blend:glow"

Rules:
- kind must be "peptide" or "blend"
- slug must exist in content/_index/entities_v1.json (validator enforces for samples)

## 2) Top-level Shape (AppState v1)

{
  "version": "app_state_v1",
  "updated_at": "YYYY-MM-DDTHH:MM:SSZ",
  "device": {
    "install_id": "uuid",
    "platform": "ios|android|web|unknown"
  },
  "favorites": {
    "items": [
      { "entity_key": "peptide:bpc-157", "created_at": "YYYY-MM-DDTHH:MM:SSZ" }
    ]
  },
  "recents": {
    "items": [
      { "entity_key": "blend:glow", "viewed_at": "YYYY-MM-DDTHH:MM:SSZ" }
    ],
    "max_items": 50
  },
  "stacks": {
    "items": [
      {
        "id": "uuid",
        "name": "Recovery Basics",
        "goal_tags": ["recovery"],
        "constraints": {
          "avoid_taxonomy_keys": [],
          "avoid_entity_kinds": [],
          "avoid_delivery_contexts": []
        },
        "items": [
          { "entity_key": "peptide:bpc-157", "added_at": "YYYY-MM-DDTHH:MM:SSZ", "notes": "" }
        ],
        "notes": "",
        "created_at": "YYYY-MM-DDTHH:MM:SSZ",
        "updated_at": "YYYY-MM-DDTHH:MM:SSZ",
        "origin": {
          "type": "manual|generated",
          "generator_version": null,
          "explanations": []
        }
      }
    ]
  }
}

## 3) Field Rules

### 3.1 version
Must equal "app_state_v1".

### 3.2 updated_at
ISO-8601 string, UTC recommended (ends with "Z").

### 3.3 device.install_id
A stable UUID generated at first install.

### 3.4 favorites.items[]
- Unique by entity_key (no duplicates).
- created_at required.

### 3.5 recents.items[]
- Unique by entity_key (keep latest viewed_at).
- max_items default 50 if missing.

### 3.6 stacks.items[]
Stack object:
- id: UUID required
- name: 1–60 chars
- goal_tags: array of strings (optional)
- constraints: optional object; empty arrays allowed
- items: array of stack item objects (0+)
- origin:
  - type: "manual" or "generated"
  - generator_version: string or null
  - explanations: array of strings (non-prescriptive)

Stack item object:
- entity_key required
- added_at required
- notes optional string (must remain non-prescriptive)

## 4) Safety / Governance
- AppState must never store dosing, administration instructions, or protocols.
- Goal tags are navigation/organization only.
- "generated" stacks must store only descriptive explanations, not regimens.

EOF
