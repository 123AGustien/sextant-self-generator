function runSystemScenario(inputText) {

    // =============================
    // 1. RISK ENGINE CALL
    // =============================
    const risk = computeRisk(inputText);

    // =============================
    // 2. CASCADE OBJECT BUILD
    // =============================
    const cascade = {
        path: inputText,
        stress: risk.systemicRisk,
        driver: risk.primaryDriver,
        regime: risk.regime
    };

    // =============================
    // 3. EXPLANATION ENGINE CALL
    // =============================
    const explanation = explainCascade({
        path: cascade.path,
        stress: cascade.stress
    });

    // =============================
    // 4. UI BINDING (SAFE DOM UPDATE)
    // =============================
    if (document.getElementById("output")) {
        document.getElementById("output").innerText =
            "RUNNING → " + inputText;
    }

    if (document.getElementById("risk")) {
        document.getElementById("risk").innerText =
            "SYSTEM RISK: " + risk.systemicRisk + " (" + risk.regime + ")";
    }

    if (document.getElementById("timeline")) {
        document.getElementById("timeline").innerText =
            "Primary Driver: " + risk.primaryDriver;
    }

    if (document.getElementById("explanation")) {
        document.getElementById("explanation").innerText =
            explanation;
    }

    // =============================
    // 5. RETURN FULL SYSTEM STATE
    // =============================
    return {
        input: inputText,
        risk: risk,
        cascade: cascade,
        explanation: explanation
    };
}
