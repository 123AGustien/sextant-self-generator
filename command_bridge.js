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
