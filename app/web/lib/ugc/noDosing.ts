export function detectDosingOrProtocol(text: string): { blocked: boolean; hits: string[] } {
  // Allow explicit negations like "no dosing" / "not a protocol" without blocking.
  // We still block real dosing/protocol content elsewhere.
  const scan = String(text || "").replace(
    /\b(?:no|not|without)\s+(?:a\s+)?(?:dosing|dose|protocol|instructions?)\b/gi,
    " "
  );

  const hits: string[] = [];

  // We allow numeric dose *mentions* (including ranges) when descriptive.
  // We still block "how-to" / instruction patterns and administration details.

  // Instructional verb + numeric dose mention (blocks "take 2 mg", "use 1–2 mg", "dose at 5 mcg", etc.)
  const directiveDose = /\b(?:take|use|start|begin|increase|decrease|titrate|dose|dosed|administer|administered|run|try)\b(?:\W+\w+){0,3}\W+\d+(?:\.\d+)?\s*(?:-|–|to)\s*\d+(?:\.\d+)?\s*(?:mg|mcg|µg|ug|iu|units?|ml|cc)\b|\b(?:take|use|start|begin|increase|decrease|titrate|dose|dosed|administer|administered|run|try)\b(?:\W+\w+){0,3}\W+\d+(?:\.\d+)?\s*(?:mg|mcg|µg|ug|iu|units?|ml|cc)\b/i;

  const patterns: Array<[string, RegExp]> = [
    ["directive-dose", directiveDose],

    // Timing / schedule language (still blocked)
    ["per-day", /\b(?:per\s*day|daily|qd|q\.d\.)\b/i],
    ["per-week", /\b(?:per\s*week|weekly|qw|q\.w\.)\b/i],
    ["x-times", /\b\d+\s*x\s*(?:day|daily|week|weekly)\b/i],
    ["titration", /\b(?:titrate|titration|ramp(?:ing)?|increase\s+to|start\s+at)\b/i],
    ["schedule", /\b(?:schedule|cycle|on\/off|weeks?\s+on|weeks?\s+off)\b/i],

    // Prep / administration (still blocked)
    ["reconstitution", /\b(?:reconstitut(?:e|ion)|bac\s*water|bacteriostatic|dilut(?:e|ion)|mix\s+with)\b/i],
    ["inject", /\b(?:inject(?:ion)?|subq|sq|subcut(?:aneous)?|im\b|intramuscular)\b/i],
  ];

  for (const [label, rx] of patterns) {
    if (rx.test(scan)) hits.push(label);
  }

  return { blocked: hits.length > 0, hits };
}
