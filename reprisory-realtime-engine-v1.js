/**
 * Reprisory Real-Time Engine v1 (GLOBAL MODE)
 * Continuous system evolution loop
 */

let systemState = null;
let interval = null;
let tick = 0;

// =========================
// INIT SYSTEM
// =========================
function initRealtimeSystem() {

  if (typeof runBankRunV1 !== "function") {
    console.error("Bank Run engine missing");
    return;
  }

  systemState = runBankRunV1();
  startLoop();
}

// =========================
// MAIN LOOP
// =========================
function startLoop() {

  if (interval) clearInterval(interval);

  interval = setInterval(() => {

    tick++;

    // =========================
    // CONTAGION STEP
    // =========================
    if (typeof runContagionV1 === "function") {
      const contagionResult = runContagionV1();

      if (contagionResult?.finalState) {
        systemState.entities = contagionResult.finalState;
      }
    }

    // =========================
    // CENTRAL BANK STEP
    // =========================
    if (typeof runCentralBankIntervention === "function") {
      const policy = runCentralBankIntervention({
        entities: systemState.entities
      });

      if (policy?.finalState) {
        systemState.entities = policy.finalState;
      }

      renderState(systemState, policy, tick);
    }

    // =========================
    // NATURAL DRIFT
    // =========================
    applyNaturalDrift(systemState.entities);

  }, 1000);
}

// =========================
// SYSTEM DRIFT
// =========================
function applyNaturalDrift(entities) {

  Object.values(entities || {}).forEach(bank => {

    const noise = (Math.random() - 0.5) * 10;

    bank.assets.cash += noise;

    if (bank.assets.cash < 0) {
      bank.assets.cash = 0;
    }
  });
}

// =========================
// RENDER
// =========================
function renderState(state, policy, tick) {

  const output = document.getElementById("output");
  const risk = document.getElementById("risk");

  if (!output || !risk) return;

  const riskLevel = calculateRisk(state.entities);

  output.textContent = JSON.stringify({
    tick,
    state: state.entities,
    regime: policy?.regime || "UNKNOWN"
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
function stopRealtimeSystem() {
  if (interval) clearInterval(interval);
  interval = null;
}

// =========================
// GLOBAL EXPORTS
// =========================
window.initRealtimeSystem = initRealtimeSystem;
window.stopRealtimeSystem = stopRealtimeSystem;
