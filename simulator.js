console.log("Schneider Cascade Engine v2 Loaded");

// =====================
// SYSTEM STATE (NODE GRAPH)
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
// CASCADE GRAPH (REAL DEPENDENCIES)
// =====================
const dependencies = {
  cooling: ["compute", "storage"],
  power: ["cooling", "compute", "network"],
  network: ["compute"],
  compute: [],
  storage: ["compute"]
};

// =====================
// METRICS ENGINE
// =====================
function calculateRisk() {
  let values = Object.values(systemState).slice(0, 5);
  let avg = values.reduce((a, b) => a + b, 0) / values.length;

  systemState.overallRisk = +(1 - avg).toFixed(2);

  console.log("Resilience Index:", avg.toFixed(2));
  console.log("Risk Score:", systemState.overallRisk);
}

// =====================
// CASCADE PROPAGATION ENGINE
// =====================
function propagateImpact(node, severity) {
  if (!dependencies[node]) return;

  dependencies[node].forEach(target => {
    let impact = severity * (Math.random() * 0.4 + 0.2); // nonlinear spread

    systemState[target] -= impact;

    console.log(
      `Cascade: ${node} → ${target} | Impact: ${impact.toFixed(2)}`
    );

    if (systemState[target] < 0.5) {
      propagateImpact(target, impact); // recursive cascade
    }
  });
}

// =====================
// EVENTS (ENTRY POINTS)
// =====================
function triggerCoolingFailure() {
  systemState.cooling -= 0.35;
  propagateImpact("cooling", 0.35);
  calculateRisk();
}

function triggerPowerInstability() {
  systemState.power -= 0.5;
  propagateImpact("power", 0.5);
  calculateRisk();
}

function triggerNetworkCongestion() {
  systemState.network -= 0.4;
  propagateImpact("network", 0.4);
  calculateRisk();
}

function runNormal() {
  console.log("System Stable Baseline");
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
  }
}
