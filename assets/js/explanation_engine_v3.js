export function explain(nodes) {

    let drivers = [];
    let max = 0;

    for (let n of nodes) {

        max = Math.max(max, n.impact);

        if (n.type === "FX_SHOCK") drivers.push("currency instability");
        if (n.type === "LIQUIDITY_STRESS") drivers.push("liquidity contraction");
        if (n.type === "BANKING_STRESS") drivers.push("banking system stress");
        if (n.type === "CONFIDENCE_LOSS") drivers.push("market confidence erosion");
    }

    let severity = "low";
    if (max > 0.8) severity = "critical";
    else if (max > 0.6) severity = "high";
    else if (max > 0.4) severity = "moderate";

    return `
CASCADE ANALYSIS
Drivers: ${drivers.join(" → ")}
Severity: ${severity}

SYSTEM INTERPRETATION:
System stress is driven by ${drivers[0] || "multi-factor conditions"}.
Propagation indicates a ${severity} regime.
`;
}
