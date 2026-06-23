console.log("Schneider Cascade Engine v3 (Tick Engine) Loaded");

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
// DEPENDENCY GRAPH (WEIGHTED)
// =====================
const dependencies = {
  cooling: [
    { node: "compute", weight: 0.35 },
    { node: "storage", weight: 0.25 }
  ],
  power: [
    { node: "cooling", weight: 0.30 },
    { node: "compute", weight: 0.40 },
    { node: "network", weight: 0.30 }
  ],
  network: [
    { node: "compute", weight: 0.50 }
  ],
  compute: [],
  storage: [
    { node: "compute", weight: 0.30 }
  ]
};

// =====================
// SIMULATION CLOCK
// =====================
let tick = 0;
let running = false;

// =====================
// UTILITIES
// =====================
function clamp(v) {
  return Math.max(0, Math.min(1, v));
}

// =====================
// CASCADE ENGINE (PER TICK)
// =====================
function propagate(node, severity) {
  const edges = dependencies[node];
  if (!edges) return;

  edges.forEach(edge => {
    let shock =
      severity *
      edge.weight *
      (0.6 + Math.random() * 0.5); // instability factor

    systemState[edge.node] -= shock;

    console.log(
      `Tick ${tick} | Cascade ${node} → ${edge.node} | Shock ${shock.toFixed(3)}`
    );

    // recursive cascade if critical threshold crossed
    if (systemState[edge.node] < 0.45) {
      propagate(edge.node, shock * 0.9);
    }
  });
}

// =====================
// NATURAL DECAY + RECOVERY MODEL
// =====================
function recoveryStep() {
  Object.keys(systemState).forEach(key => {
    if (key === "overallRisk") return;

    // natural stabilization (cool-down recovery)
    let recovery = 0.003;

    // degraded systems recover slower
    if (systemState[key] < 0.5) recovery *= 0.4;

    systemState[key] += recovery;
    systemState[key] = clamp(systemState[key]);
  });
}

// =====================
// RISK ENGINE
// =====================
function calculateRisk() {
  let nodes = ["cooling", "power", "network", "compute", "storage"];

  let avg =
    nodes.reduce((sum, n) => sum + systemState[n], 0) / nodes.length;

  systemState.overallRisk = +(1 - avg).toFixed(3);

  console.log(
    `Tick ${tick} | Resilience Index: ${avg.toFixed(3)} | Risk: ${systemState.overallRisk}`
  );
}

// =====================
// SCENARIO INJECTION (SEEDS)
// =====================
function inject(event, severity) {
  systemState[event] -= severity;
  systemState[event] = clamp(systemState[event]);

  console.log(`🔥 Event injected: ${event} (-${severity})`);

  propagate(event, severity);
}

// =====================
// TICK ENGINE LOOP
// =====================
function step() {
  tick++;

  // passive recovery
  recoveryStep();

  // risk calculation
  calculateRisk();

  // stop condition (optional stability return)
  if (tick > 200) {
    running = false;
    console.log("Simulation ended (tick limit reached)");
  }

  if (running) {
    setTimeout(step, 300); // simulation speed
  }
}

// =====================
// PUBLIC API
// =====================
function startSimulation() {
  if (running) return;
  running = true;
  tick = 0;
  console.log("▶ Simulation started");
  step();
}

function stopSimulation() {
  running = false;
  console.log("⏹ Simulation stopped");
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
  inject("network", 0.40);
}

function runNormal() {
  console.log("System running baseline (no injection)");
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

    case "start":
      startSimulation();
      break;

    case "stop":
      stopSimulation();
      break;

    default:
      runNormal();
  }
}
