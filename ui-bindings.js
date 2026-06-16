/**
 * Reprisory UI Binding Layer v1 (GLOBAL MODE)
 */

// =========================
// SAFE GETTER
// =========================
function get(id) {
  return document.getElementById(id);
}

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
// BANK RUN
// expects global function: runBankRunV1
// =========================
const bankRunBtn = get("runBankRun");

if (bankRunBtn) {
  bankRunBtn.onclick = () => {
    if (typeof runBankRunV1 !== "function") {
      console.error("runBankRunV1 missing");
      return;
    }

    const result = runBankRunV1();
    updateOutput(result, "Risk Index: HIGH (Bank Run)");
  };
}

// =========================
// CONTAGION
// expects global function: runContagionV1
// =========================
const simulationBtn = get("runSimulation");

if (simulationBtn) {
  simulationBtn.onclick = () => {
    if (typeof runContagionV1 !== "function") {
      console.error("runContagionV1 missing");
      return;
    }

    const result = runContagionV1();
    updateOutput(result, "Risk Index: AMBER (Contagion)");
  };
}

// =========================
// CENTRAL BANK
// expects global function: runCentralBankIntervention
// =========================
const centralBankBtn = get("runCentralBank");

if (centralBankBtn) {
  centralBankBtn.onclick = () => {
    if (typeof runCentralBankIntervention !== "function") {
      console.error("runCentralBankIntervention missing");
      return;
    }

    const result = runCentralBankIntervention({
      entities: {}
    });

    updateOutput(result, "Risk Index: STABILISING");
  };
}

console.log("Reprisory UI bindings active (GLOBAL MODE)");
