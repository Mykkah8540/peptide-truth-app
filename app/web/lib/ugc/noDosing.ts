export function detectDosingOrProtocol(text: string): { blocked: boolean; hits: string[] } {
  // Allow explicit negations like "no dosing" / "not a protocol" without blocking.
  // We still block real dosing/protocol content elsewhere.
  const scan = String(text || "").replace(
    /\b(?:no|not|without)\s+(?:a\s+)?(?:dosing|dose|protocol|instructions?)\b/gi,
    " "
  );

  const hits: string[] = [];

  // Basic dosing/protocol triggers (conservative)
  const patterns: Array<[string, RegExp]> = [
    ["mg", /\b\d+(\.\d+)?\s*mg\b/i],
    ["mcg", /\b\d+(\.\d+)?\s*mcg\b/i],
    ["ug", /\b\d+(\.\d+)?\s*(?:µg|ug)\b/i],
    ["iu", /\b\d+(\.\d+)?\s*iu\b/i],
    ["units", /\b\d+(\.\d+)?\s*units?\b/i],
    ["ml", /\b\d+(\.\d+)?\s*ml\b/i],
    ["cc", /\b\d+(\.\d+)?\s*cc\b/i],
    ["per-day", /\b(?:per\s*day|daily|qd|q\.d\.)\b/i],
    ["per-week", /\b(?:per\s*week|weekly|qw|q\.w\.)\b/i],
    ["x-times", /\b\d+\s*x\s*(?:day|daily|week|weekly)\b/i],
    ["titration", /\b(?:titrate|titration|ramp(?:ing)?|increase\s+to|start\s+at)\b/i],
    ["schedule", /\b(?:schedule|cycle|on\/off|weeks?\s+on|weeks?\s+off)\b/i],
    ["reconstitution", /\b(?:reconstitut(?:e|ion)|bac\s*water|bacteriostatic|dilut(?:e|ion)|mix\s+with)\b/i],
    ["inject", /\b(?:inject(?:ion)?|subq|sq|subcut(?:aneous)?|im\b|intramuscular)\b/i],
  ];

  for (const [label, rx] of patterns) {
    if (rx.test(scan)) hits.push(label);
  }

  return { blocked: hits.length > 0, hits };
}
