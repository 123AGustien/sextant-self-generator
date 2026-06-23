console.log("Simulation Engine v1 Loaded");

// =====================
// SYSTEM STATE
// =====================
let systemState = {
  cooling: 1.0,
  power: 1.0,
  network: 1.0,
  compute: 1.0,
  storage: 1.0,
  overallRisk: 0.0
};

// =====================
// DEPENDENCY GRAPH
// =====================
const dependencies = {
  cooling: ["compute", "storage"],
  power: ["cooling", "compute", "network"],
  network: ["compute"],
  compute: [],
  storage: ["compute"]
};

// =====================
// UTILITY
// =====================
function clamp(v) {
  return Math.max(0, Math.min(1, v));
}

// =====================
// CASCADE PROPAGATION
// =====================
function propagate(node, severity) {
  if (!dependencies[node]) return;

  dependencies[node].forEach(target => {
    const shock = severity * (Math.random() * 0.4 + 0.2);

    systemState[target] -= shock;
    systemState[target] = clamp(systemState[target]);

    console.log(
      `Cascade: ${node} → ${target} | Shock: ${shock.toFixed(3)}`
    );

    if (systemState[target] < 0.45) {
      propagate(target, shock * 0.8);
    }
  });
}

// =====================
// RISK ENGINE
// =====================
function calculateRisk() {
  const nodes = ["cooling", "power", "network", "compute", "storage"];

  const avg =
    nodes.reduce((sum, n) => sum + systemState[n], 0) / nodes.length;

  systemState.overallRisk = +(1 - avg).toFixed(3);

  console.log(
    `Risk Index: ${avg.toFixed(3)} | Risk Score: ${systemState.overallRisk}`
  );
}

// =====================
// EVENT INJECTION
// =====================
function inject(event, severity) {
  systemState[event] -= severity;
  systemState[event] = clamp(systemState[event]);

  console.log(`Event injected: ${event} (-${severity})`);

  propagate(event, severity);
}

// =====================
// SCENARIOS
// =====================
function triggerCoolingFailure() {
  inject("cooling", 0.35);
}

function triggerPowerInstability() {
  inject("power", 0.45);
}

function triggerNetworkCongestion() {
  inject("network", 0.4);
}

function runNormal() {
  console.log("System running baseline");
  calculateRisk();
}

// =====================
// MAIN RUNNER
// =====================
function runScenario(type) {
  console.log("Running scenario:", type);

  switch (type) {
    case "cooling":
      triggerCoolingFailure();
      break;

    case "power":
      triggerPowerInstability();
      break;

    case "network":
      triggerNetworkCongestion();
      break;

    default:
      runNormal();
      break;
  }

  calculateRisk();
}

// =====================
// UI HOOK (optional safe bridge)
// =====================
function updateMetrics() {
  // Intentionally left as hook for UI screen
}
