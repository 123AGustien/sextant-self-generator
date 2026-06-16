function updateUI(output, risk, result, riskLevel) {
    if (output) {
        output.textContent = JSON.stringify(result, null, 2);
    }

    if (risk) {
        risk.textContent = "Risk Index: " + riskLevel;
    }
}

/* =========================
   CORE SYSTEM (GENERATOR)
   ========================= */

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

/* =========================
   SIMULATION SYSTEM
   ========================= */

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
   REPRISORY: BANK RUN
   ========================= */

function runBankRun() {
    const output = document.getElementById("output");
    const risk = document.getElementById("risk");

    if (typeof triggerBankRun !== "function") {
        console.error("System not ready: triggerBankRun missing");
        return;
    }

    const result = triggerBankRun();

    updateUI(output, risk, result, "CRITICAL");
}

/* =========================
   REPRISORY: CONTAGION (READY HOOK)
   ========================= */

function runContagion() {
    const output = document.getElementById("output");
    const risk = document.getElementById("risk");

    if (typeof triggerContagion !== "function") {
        console.error("System not ready: triggerContagion missing");
        return;
    }

    const result = triggerContagion();

    updateUI(output, risk, result, "SYSTEMIC RISK");
}

/* =========================
   COMMAND ROUTER (SCALE LAYER)
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

        case "contagion":
            runContagion();
            break;

        default:
            console.error("Unknown mode:", mode);
    }
}
