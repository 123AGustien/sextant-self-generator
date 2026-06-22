console.log("Schneider Data Centre Cascade Simulator Loaded");

// ================================
// SYSTEM STATE (NORMALISED 0–1)
// ================================
let systemState = {
  nodes: {
    cooling: { value: 1.0, weight: 1.0 },
    power:   { value: 1.0, weight: 1.2 },
    network: { value: 1.0, weight: 0.9 },
    compute: { value: 1.0, weight: 1.3 }
  },

  risk: 0.0
};

// ================================
// DEPENDENCY MAP (CASCADE LOGIC)
// ================================
const links = {
  cooling: ["power", "compute"],
  power:   ["compute"],
  network: ["compute"],
  compute: []
};

// ================================
// CORE STRESS FUNCTION (NON-LINEAR)
// ================================
function stress(nodeName, impact, source = "external") {
  const node = systemState.nodes[nodeName];

  // nonlinear decay curve (prevents simple subtraction behaviour)
  const delta = Math.pow(impact, 1.25) * node.weight;

  node.value -= delta;

  // clamp
  node.value = Math.max(0, Math.min(1, node.value));

  console.log(`⚠ ${source} → ${nodeName} impacted (${delta.toFixed(3)})`);

  // trigger cascade if weak
  if (node.value < 0.65) {
    cascade(nodeName, (1 - node.value) * 0.5);
  }
}

// ================================
// CASCADE ENGINE
// ================================
function cascade(origin, intensity) {
  const targets = links[origin];

  targets.forEach((t) => {
    const amplified = intensity * (1.1 + Math.random() * 0.4);
    stress(t, amplified, origin);
  });
}

// ================================
// SCENARIO TRIGGERS
// ================================
function coolingFailure() {
  stress("cooling", 0.45);
}

function powerInstability() {
  stress("power", 0.55);
}

function networkCongestion() {
  stress("network", 0.4);
}

// ================================
// NATURAL SYSTEM DRIFT (REALISM LAYER)
// ================================
function systemDrift() {
  Object.keys(systemState.nodes).forEach((key) => {
    const node = systemState.nodes[key];

    // slight instability over time
    const drift = (Math.random() - 0.5) * 0.02;

    node.value += drift;
    node.value = Math.max(0, Math.min(1, node.value));
  });
}

// ================================
// METRICS ENGINE
// ================================
function updateMetrics() {
  const values = Object.values(systemState.nodes).map(n => n.value);

  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  systemState.risk = (1 - avg).toFixed(3);

  console.log("────────────────────");
  console.log("Resilience Index:", avg.toFixed(3));
  console.log("Risk Score:", systemState.risk);
}

// ================================
// MAIN RUNNER (UI HOOK)
// ================================
function runScenario(type) {
  console.log("▶ Scenario:", type);

  switch (type) {
    case "cooling":
      coolingFailure();
      break;

    case "power":
      powerInstability();
      break;

    case "network":
      networkCongestion();
      break;

    default:
      console.log("Normal operation");
  }

  systemDrift();
  updateMetrics();
}
