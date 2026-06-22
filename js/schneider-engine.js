// ===============================
// SCHNEIDER ENGINE (SINGLE SOURCE)
// ===============================

let systemState = {
  cooling: 1.0,
  power: 1.0,
  network: 1.0,
  compute: 1.0,
  storage: 1.0,
  risk: 0.0
};

let running = false;
let tick = 0;

// ===============================
// UTIL
// ===============================
function clamp(v) {
  return Math.max(0, Math.min(1, v));
}

// ===============================
// LOG BRIDGE
// ===============================
function log(msg) {
  console.log(msg);
  window.__log?.(msg);
}

// ===============================
// DAMAGE MODEL
// ===============================
function applyDamage(node, amount) {
  systemState[node] = clamp(systemState[node] - amount);
}

// ===============================
// SIMPLE CASCADE MODEL
// ===============================
function propagate() {
  systemState.compute = clamp(systemState.compute - (1 - systemState.power) * 0.2);
  systemState.storage = clamp(systemState.storage - (1 - systemState.cooling) * 0.1);
}

// ===============================
// RISK ENGINE
// ===============================
function calculateRisk() {
  const avg =
    (systemState.cooling +
     systemState.power +
     systemState.network +
     systemState.compute +
     systemState.storage) / 5;

  systemState.risk = +(1 - avg).toFixed(3);
}

// ===============================
// SIMULATION LOOP
// ===============================
function step() {
  if (!running) return;

  tick++;

  propagate();
  calculateRisk();

  window.__render?.(systemState, tick);

  if (tick < 200) {
    setTimeout(step, 300);
  } else {
    running = false;
    log("Simulation complete");
  }
}

// ===============================
// CONTROLS
// ===============================
function startSimulation() {
  if (running) return;
  running = true;
  tick = 0;
  log("Simulation started");
  step();
}

function stopSimulation() {
  running = false;
  log("Simulation stopped");
}

// ===============================
// SCENARIOS
// ===============================
function runScenario(type) {
  log("Scenario: " + type);

  if (type === "cooling") applyDamage("cooling", 0.3);
  if (type === "power") applyDamage("power", 0.4);
  if (type === "network") applyDamage("network", 0.35);

  startSimulation();
}
