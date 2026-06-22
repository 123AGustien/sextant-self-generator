console.log("Schneider Data Centre Simulator Loaded");

// SYSTEM STATE
let systemState = {
  cooling: 1.0,
  power: 1.0,
  network: 1.0,
  compute: 1.0,
  overallRisk: 0.0
};

// METRICS
function updateMetrics() {
  let avg =
    (systemState.cooling +
      systemState.power +
      systemState.network +
      systemState.compute) / 4;

  systemState.overallRisk = (1 - avg).toFixed(2);

  console.log("Resilience Index:", avg.toFixed(2));
  console.log("Risk Score:", systemState.overallRisk);
}

// CASCADE EVENTS

function coolingFailure() {
  systemState.cooling -= 0.4;
  systemState.power -= 0.1;
  updateMetrics();
}

function powerInstability() {
  systemState.power -= 0.5;
  systemState.compute -= 0.2;
  updateMetrics();
}

function networkCongestion() {
  systemState.network -= 0.4;
  systemState.compute -= 0.1;
  updateMetrics();
}

// MAIN RUNNER
function runScenario(type) {
  console.log("Running scenario:", type);

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
      updateMetrics();
  }
}
