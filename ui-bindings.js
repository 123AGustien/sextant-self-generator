/**
 * Reprisory UI Binding Layer v1 (GLOBAL MODE)
 * Connects buttons to globally exposed simulation functions
 */

// =========================
// SAFE GETTER
// =========================
function get(id) {
    return document.getElementById(id);
}

// =========================
// OUTPUT UPDATE
// =========================
function updateOutput(result, riskText) {
    const output = get("output");
    const risk = get("risk");

    if (output) {
        output.textContent = JSON.stringify(result, null, 2);
    }

    if (risk) {
        risk.textContent = riskText;
    }
}

// =========================
// ERROR HANDLER
// =========================
function showError(message) {
    console.error(message);

    const output = get("output");
    const risk = get("risk");

    if (output) {
        output.textContent = message;
    }

    if (risk) {
        risk.textContent = "Risk Index: ERROR";
    }
}

// =========================
// BANK RUN BUTTON
// =========================
const bankRunBtn = get("runBankRun");

if (bankRunBtn) {
    bankRunBtn.onclick = () => {

        if (typeof window.runBankRunV1 !== "function") {
            showError("runBankRunV1 missing");
            return;
        }

        const result = window.runBankRunV1();

        updateOutput(
            result,
            "Risk Index: HIGH (Bank Run)"
        );
    };
}

// =========================
// CONTAGION BUTTON
// =========================
const simulationBtn = get("runSimulation");

if (simulationBtn) {
    simulationBtn.onclick = () => {

        if (typeof window.runContagionV1 !== "function") {
            showError("runContagionV1 missing");
            return;
        }

        const result = window.runContagionV1();

        updateOutput(
            result,
            "Risk Index: AMBER (Contagion)"
        );
    };
}

// =========================
// CENTRAL BANK BUTTON
// =========================
const centralBankBtn = get("runCentralBank");

if (centralBankBtn) {
    centralBankBtn.onclick = () => {

        if (typeof window.runCentralBankIntervention !== "function") {
            showError("runCentralBankIntervention missing");
            return;
        }

        const result = window.runCentralBankIntervention({
            entities: {}
        });

        updateOutput(
            result,
            "Risk Index: STABILISING"
        );
    };
}

// =========================
// STARTUP LOGGING
// =========================
console.log("Reprisory UI bindings active");

console.log(
    "runBankRunV1:",
    typeof window.runBankRunV1
);

console.log(
    "runContagionV1:",
    typeof window.runContagionV1
);

console.log(
    "runCentralBankIntervention:",
    typeof window.runCentralBankIntervention
);
