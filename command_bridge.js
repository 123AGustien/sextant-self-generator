function updateUI(output, risk, result, riskLevel) {
    if (output) {
        output.textContent = JSON.stringify(result, null, 2);
    }

    if (risk) {
        risk.textContent = "Risk Index: " + riskLevel;
    }
}

function runSystem() {
    const output = document.getElementById("output");
    const risk = document.getElementById("risk");

    if (typeof generateModule !== "function") {
        console.error("System not ready: generateModule missing");
        return;
    }

    const result = generateModule("api");

    updateUI(output, risk, result, "LOW");
}

function runSimulation() {
    const output = document.getElementById("output");
    const risk = document.getElementById("risk");

    if (typeof generateModule !== "function") {
        console.error("System not ready: generateModule missing");
        return;
    }

    const result = generateModule("simulator");

    updateUI(output, risk, result, "HIGH");
}

/* =========================
   REPRISORY INTEGRATION
   ========================= */

function runBankRun() {
    const output = document.getElementById("output");
    const risk = document.getElementById("risk");

    // check Reprisory hook exists
    if (typeof triggerBankRun !== "function") {
        console.error("System not ready: triggerBankRun missing");
        return;
    }

    const result = triggerBankRun();

    updateUI(output, risk, result, "CRITICAL");
}

/* =========================
   OPTIONAL: COMMAND ROUTER
   ========================= */

function runCommand(mode) {
    switch (mode) {
        case "system":
            runSystem();
            break;

        case "simulation":
            runSimulation();
            break;

        case "bankrun":
            runBankRun();
            break;

        default:
            console.error("Unknown mode:", mode);
    }
}
