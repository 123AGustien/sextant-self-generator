/**
 * Reprisory UI Binding Layer v1
 * Connects UI buttons → simulation engine
 */

// =========================
// IMPORT ENGINE MODULES
// =========================
import { runBankRunV1 } from "./reprisory-bankrun-v1.js";
import { runContagionV1 } from "./reprisory-contagion-v1.js";
import { runCentralBankIntervention } from "./reprisory-centralbank-v2.js";

// =========================
// SAFE GETTER
// =========================
function get(id) {
  return document.getElementById(id);
}

// =========================
// UPDATE OUTPUT
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
// BANK RUN BUTTON
// =========================
const bankRunBtn = get("runBankRun");

if (bankRunBtn) {
  bankRunBtn.onclick = () => {
    const result = runBankRunV1();

    updateOutput(result, "Risk Index: HIGH (Bank Run Active)");
  };
}

// =========================
// CONTAGION SIMULATION
// =========================
const simulationBtn = get("runSimulation");

if (simulationBtn) {
  simulationBtn.onclick = () => {
    const result = runContagionV1();

    updateOutput(result, "Risk Index: AMBER (Contagion Spread)");
  };
}

// =========================
// CENTRAL BANK INTERVENTION
// =========================
const centralBankBtn = get("runCentralBank");

if (centralBankBtn) {
  centralBankBtn.onclick = () => {
    const result = runCentralBankIntervention({
      entities: {}
    });

    updateOutput(result, "Risk Index: STABILISING (Policy Active)");
  };
}

// =========================
// SYSTEM READY
// =========================
console.log("🧠 Reprisory UI bindings loaded successfully");
