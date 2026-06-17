function explainCascade(cascade) {

  // -----------------------------
  // 1. Extract cascade path
  // -----------------------------
  const path = cascade.path || cascade.cascade || "Unknown Cascade";

  // -----------------------------
  // 2. Classify severity based on stress score
  // -----------------------------
  const stress = cascade.stress || 0;

  let severity = "";
  if (stress <= 0.3) severity = "low";
  else if (stress <= 0.6) severity = "moderate";
  else if (stress <= 0.8) severity = "high";
  else severity = "critical";

  // -----------------------------
  // 3. Identify primary driver
  // -----------------------------
  let driver = "multi-factor interaction";

  if (path.includes("FX")) driver = "foreign exchange instability";
  else if (path.includes("LIQ")) driver = "liquidity contraction";
  else if (path.includes("BANK")) driver = "banking system stress";
  else if (path.includes("EQ")) driver = "equity market volatility";
  else if (path.includes("CONF")) driver = "confidence erosion";

  // -----------------------------
  // 4. Generate interpretation
  // -----------------------------
  const interpretation = `
Cascade Analysis:
- Primary Pathway: ${path}
- Primary Driver: ${driver}
- Severity Level: ${severity}

System Interpretation:
This cascade is driven by ${driver}, propagating through interconnected financial subsystems.
The system is currently operating in a ${severity} stress regime.

Resilience Insight:
Intervention should target the primary driver to prevent escalation across secondary channels.
  `.trim();

  // -----------------------------
  // 5. Return structured output
  // -----------------------------
  return {
    cascade: path,
    driver: driver,
    severity: severity,
    interpretation: interpretation
  };
}
