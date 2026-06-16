/**
 * Reprisory Real-Time Engine v1
 * Converts all simulations into continuous evolving system
 */

import { runBankRunV1 } from "./reprisory-bankrun-v1.js";
import { runContagionV1 } from "./reprisory-contagion-v1.js";
import { runCentralBankIntervention } from "./reprisory-centralbank-v2.js";

let systemState = null;
let interval = null;
let tick = 0;

// =========================
// INITIALISE SYSTEM
// =========================
export function initRealtimeSystem() {
  systemState = runBankRunV1(); // seed initial condition
  startLoop();
}

// =========================
// MAIN LOOP (HEART OF SYSTEM)
// =========================
function startLoop() {

  if (interval) clearInterval(interval);

  interval = setInterval(() => {

    tick++;

    // STEP 1: CONTAGION EVOLUTION
    const contagionResult = runContagionV1();
    systemState.entities =
      contagionResult.history?.at(-1)?.entities || systemState.entities;

    // STEP 2: CENTRAL BANK RESPONSE
    const policy = runCentralBankIntervention({
      entities: systemState.entities
    });

    systemState.entities = policy.finalState;

    // STEP 3: SYSTEM DRIFT (natural decay / instability)
    applyNaturalDrift(systemState.entities);

    // STEP 4: RENDER UPDATE
    renderState(systemState, policy, tick);

  }, 1000); // 1 second tick (real-time feel)
}

// =========================
// NATURAL SYSTEM DRIFT
// =========================
function applyNaturalDrift(entities) {
  Object.values(entities).forEach(bank => {

    // small stochastic decay
    const noise = (Math.random() - 0.5) * 10;

    bank.assets.cash += noise;

    // prevent negative infinity collapse artifacts
    if (bank.assets.cash < 0) {
      bank.assets.cash = 0;
    }
  });
}

// =========================
// RENDER ENGINE
// =========================
function renderState(state, policy, tick) {

  const output = document.getElementById("output");
  const risk = document.getElementById("risk");

  if (!output || !risk) return;

  const riskLevel = calculateRisk(state.entities);

  output.textContent = JSON.stringify({
    tick,
    state: state.entities,
    policy: policy.regime
  }, null, 2);

  risk.textContent = "Risk Index: " + riskLevel;
}

// =========================
// RISK ENGINE
// =========================
function calculateRisk(entities) {
  let stress = 0;

  Object.values(entities || {}).forEach(b => {
    const net = b.assets.cash - b.liabilities.deposits;
    if (net < 0) stress += Math.abs(net);
  });

  if (stress < 500) return "GREEN";
  if (stress < 1500) return "AMBER";
  return "RED";
}

// =========================
// STOP SYSTEM
// =========================
export function stopRealtimeSystem() {
  if (interval) clearInterval(interval);
  interval = null;
}
