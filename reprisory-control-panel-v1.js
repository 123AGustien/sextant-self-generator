/**
 * Reprisory Control Panel v1
 * Interactive scenario editor with live simulation
 */

import { runCustomScenario } from "./reprisory-scenario-builder-v1.js";

// =========================
// INITIAL STATE
// =========================
const state = {
  shockLevel: "medium",
  contagionStrength: 1.0,
  policyAggression: "standard"
};

// =========================
// INIT UI
// =========================
export function initControlPanel() {
  const container = document.getElementById("control-panel");

  if (!container) {
    console.error("Control panel container missing");
    return;
  }

  container.innerHTML = `
    <h2>Reprisory Control Panel</h2>

    <label>Shock Level</label>
    <select id="shockLevel">
      <option value="low">Low</option>
      <option value="medium" selected>Medium</option>
      <option value="high">High</option>
    </select>

    <label>Contagion Strength</label>
    <input id="contagionStrength" type="range" min="0.5" max="2.0" step="0.1" value="1.0" />

    <label>Policy Aggression</label>
    <select id="policyAggression">
      <option value="low">Low</option>
      <option value="standard" selected>Standard</option>
      <option value="aggressive">Aggressive</option>
    </select>

    <button onclick="runLiveScenario()">Run Crisis Simulation</button>

    <hr/>

    <div id="control-output"></div>
  `;

  attachListeners();
}

// =========================
// EVENT LISTENERS
// =========================
function attachListeners() {
  document.getElementById("shockLevel").onchange = (e) => {
    state.shockLevel = e.target.value;
  };

  document.getElementById("contagionStrength").oninput = (e) => {
    state.contagionStrength = parseFloat(e.target.value);
  };

  document.getElementById("policyAggression").onchange = (e) => {
    state.policyAggression = e.target.value;
  };
}

// =========================
// LIVE SIMULATION RUNNER
// =========================
export function runLiveScenario() {

  const result = runCustomScenario({
    shockLevel: state.shockLevel,
    contagionStrength: state.contagionStrength,
    policyAggression: state.policyAggression
  });

  renderOutput(result);
}

// =========================
// OUTPUT RENDER
// =========================
function renderOutput(result) {

  const output = document.getElementById("control-output");

  if (!output) return;

  const risk = classifyRisk(result.result?.finalState);

  output.innerHTML = `
    <h3>Simulation Result</h3>

    <p><strong>Scenario:</strong> ${result.simulation}</p>

    <p><strong>Shock Level:</strong> ${result.config.shockLevel}</p>

    <p><strong>Contagion Strength:</strong> ${result.config.contagionStrength}</p>

    <p><strong>Policy Mode:</strong> ${result.config.policyAggression}</p>

    <p><strong>System Risk:</strong> ${risk}</p>

    <pre style="background:#111;color:#0f0;padding:10px;overflow:auto;">
${JSON.stringify(result.result.finalState, null, 2)}
    </pre>
  `;
}

// =========================
// RISK CLASSIFIER
// =========================
function classifyRisk(state) {
  let stress = 0;

  Object.values(state || {}).forEach(bank => {
    const net = bank.assets.cash - bank.liabilities.deposits;

    if (net < 0) stress += Math.abs(net);
  });

  if (stress < 500) return "GREEN";
  if (stress < 1500) return "AMBER";
  return "RED";
}
