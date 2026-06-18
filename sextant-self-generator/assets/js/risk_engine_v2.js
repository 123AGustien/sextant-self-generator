function computeRisk(input) {

    // =============================
    // NORMALIZE INPUT
    // =============================
    const text = (typeof input === "string")
        ? input.toLowerCase()
        : "";

    // =============================
    // SUBSYSTEM SCORING MODEL
    // =============================
    const subsystems = {
        fx: text.includes("fx") || text.includes("currency") ? 0.85 : 0.25,
        liquidity: text.includes("liquidity") ? 0.9 : 0.3,
        bank: text.includes("bank") || text.includes("credit") ? 0.8 : 0.35,
        market: text.includes("market") || text.includes("volatility") ? 0.75 : 0.4,
        confidence: text.includes("panic") || text.includes("shock") ? 0.9 : 0.45
    };

    // =============================
    // RISK AGGREGATION
    // =============================
    const values = Object.values(subsystems);
    const maxRisk = Math.max(...values);

    const avgRisk =
        values.reduce((a, b) => a + b, 0) / values.length;

    const systemicRisk = (maxRisk * 0.6) + (avgRisk * 0.4);

    // =============================
    // REGIME CLASSIFICATION
    // =============================
    let regime = "stable";

    if (systemicRisk > 0.8) regime = "critical";
    else if (systemicRisk > 0.6) regime = "high";
    else if (systemicRisk > 0.4) regime = "moderate";
    else if (systemicRisk > 0.2) regime = "watch";

    // =============================
    // PRIMARY DRIVER DETECTION
    // =============================
    const sorted = Object.entries(subsystems)
        .sort((a, b) => b[1] - a[1]);

    const primaryDriver = sorted[0][0];

    // =============================
    // CASCADE OUTPUT (FOR EXPLANATION ENGINE)
    // =============================
    return {
        input: input,
        subsystems: subsystems,
        systemicRisk: Number(systemicRisk.toFixed(3)),
        regime: regime,
        primaryDriver: primaryDriver,
        timestamp: new Date().toISOString()
    };
}
