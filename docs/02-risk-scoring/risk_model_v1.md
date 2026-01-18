# Risk Model v1 (Authoritative)

This document defines how the app assigns and explains a peptide’s **Safety Risk Level (1–10)**.
It is designed to be:
- truth-first
- neutral (no endorsement, no condemnation)
- understandable to laypeople
- defensible to clinicians
- explicitly protective for adolescents/young users

**Non-negotiable:** Risk must never be hidden below benefits in the UI.

---

## 1) What “Risk 1–10” Means

The risk score is a **harm-likelihood-and-severity composite**, weighted by evidence quality and uncertainty.
It is not a moral judgment and is not “how scary the peptide sounds.”

### Scale (global interpretation)
- **1–2 (Low):** Minimal observed harm in humans at studied exposures; strong evidence; low unknowns.
- **3–4 (Moderate-Low):** Some adverse effects or meaningful unknowns; risks generally manageable with medical oversight.
- **5–6 (Moderate):** Clear adverse-effect profile and/or limited human data; meaningful interaction/contraindication risk.
- **7–8 (High):** Serious risk potential, narrow safety margin, frequent misuse patterns, or significant unknowns with plausible harm.
- **9–10 (Very High):** Severe harm potential, high likelihood of meaningful adverse outcomes, or unacceptable uncertainty.

---

## 2) Inputs Used to Compute Risk

Risk score is computed from the following components:

### A) Severity (S)
Clinical consequence if things go wrong.
- minimal
- mild
- moderate
- high
- critical

### B) Likelihood (L)
How likely harm is under real-world use patterns (not idealized clinical conditions).
- unlikely
- possible
- likely
- very_likely

### C) Evidence Weight (E)
How strong the human evidence is **for safety AND for harm**:
- regulatory_label
- rct_meta
- rct
- human_interventional
- human_observational
- animal
- in_vitro
- mechanistic_only

### D) Uncertainty / Unknowns Penalty (U)
Applied when:
- limited human exposure data
- short study durations only
- conflicting results
- unclear dose-response
- plausible long-term harms not ruled out

### E) Misuse Amplifier (M)
Applied when typical real-world behavior increases risk:
- frequent stacking with other agents
- dose escalation culture
- prolonged exposure beyond studied durations
- adolescent/athlete misuse patterns
- black-market variability / purity issues (not instructions; reality acknowledgment)

### F) Interaction Hot Zones (H)
Applied if the peptide interacts strongly with one or more of these domains:
- glycemic control (hypoglycemia/hyperglycemia)
- hemodynamics (BP/HR/arrhythmia)
- coagulation/bleeding
- CNS/psychiatric effects
- immune modulation
- renal/hepatic load
- oncologic signaling / growth pathways
- electrolyte balance

### G) Developmental Risk Trigger (D)
Applied when mechanism or evidence suggests risk to:
- puberty/endocrine maturation
- growth plate physiology
- long-term hormone setpoints
- neurodevelopmental plasticity
- fertility development

This is not rare—many peptides touch growth, metabolism, and endocrine axes.

---

## 3) Scoring Method (v1)

Risk Score is assigned using a structured rubric rather than a black-box formula.

### Step 1 — Assign base band by Severity x Likelihood
Use the matrix below to choose the starting band:

| Severity \\ Likelihood | unlikely | possible | likely | very_likely |
|---|---:|---:|---:|---:|
| minimal | 1–2 | 2–3 | 3–4 | 4–5 |
| mild    | 2–3 | 3–4 | 4–5 | 5–6 |
| moderate| 3–4 | 4–5 | 5–6 | 6–7 |
| high    | 4–5 | 5–6 | 6–7 | 7–8 |
| critical| 6–7 | 7–8 | 8–9 | 9–10 |

Pick the exact number inside the band based on evidence and uncertainty (steps 2–4).

### Step 2 — Adjust for Evidence Weight (E)
- Strong human/regulatory evidence with consistent safety → adjust **down** within band (never below 1)
- Limited/weak human evidence → adjust **up** within band
- Primarily animal/in-vitro/mechanistic → push toward top of band

### Step 3 — Apply Uncertainty Penalty (U)
If long-term safety is not well characterized or data is sparse/conflicting:
- add **+1** (typical)
- add **+2** (major unknowns + plausible serious harm)
Cap at 10.

### Step 4 — Apply Misuse + Interaction modifiers (M, H)
If misuse patterns are common OR interaction hot zones are significant:
- add **+1** (one major factor present)
- add **+2** (multiple major factors present)
Cap at 10.

### Step 5 — Developmental Risk escalation (D)
If developmental trigger is present:
- add **+1** minimum
- add **+2** if plausible irreversibility or endocrine setpoint disruption is credible
This should also generate a **mandatory PDP Developmental Risk Block**.

---

## 4) Required Outputs Stored in DB

Every peptide must have a versioned risk record with:
- risk_score (1–10)
- severity (enum)
- likelihood (enum)
- evidence_grade (enum)
- developmental_risk (boolean)
- unknowns_penalty (boolean)
- rationale (plain English, no hedging)
- effective_from/effective_to (versioning)

---

## 5) Language Rules for Risk Communication

### Required
- State what is known vs unknown.
- Separate human outcomes from animal/in-vitro.
- If a risk is speculative: label as hypothesis and explain mechanism briefly.
- Use concrete consequences, not vague “may be dangerous.”

### Forbidden
- “Safe” or “guaranteed safe.”
- Instructions on sourcing, reconstituti
