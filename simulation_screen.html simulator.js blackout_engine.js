<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Schneider Datacentre Pilot — Simulation Screen</title>

<style>
body {
  margin: 0;
  background: #0a0f14;
  color: #d6e2f0;
  font-family: monospace;
}

header {
  padding: 10px;
  border-bottom: 1px solid #222;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px;
}

.panel {
  border: 1px solid #222;
  padding: 10px;
  background: #0d141b;
}

button {
  padding: 10px;
  margin: 5px;
  background: #0a0f14;
  color: #00ff88;
  border: 1px solid #00ff88;
  cursor: pointer;
}

button:hover {
  background: #00ff88;
  color: #0a0f14;
}

.metric {
  margin: 5px 0;
}
</style>
</head>

<body>

<header>
  <h2>Schneider Datacentre Pilot — Simulation Core</h2>
</header>

<div class="container">

  <!-- CONTROLS -->
  <div class="panel">
    <h3>Controls</h3>

    <button onclick="runScenario('cooling')">Cooling Failure</button>
    <button onclick="runScenario('power')">Power Instability</button>
    <button onclick="runScenario('network')">Network Congestion</button>
    <button onclick="runScenario('normal')">Normal Operation</button>
    <button onclick="triggerBlackout()">Blackout Mode</button>

    <hr />

    <div class="metric">Cooling: <span id="cooling">1.00</span></div>
    <div class="metric">Power: <span id="power">1.00</span></div>
    <div class="metric">Network: <span id="network">1.00</span></div>
    <div class="metric">Compute: <span id="compute">1.00</span></div>
    <div class="metric">Storage: <span id="storage">1.00</span></div>
    <div class="metric">Risk: <span id="risk">0.00</span></div>
  </div>

  <!-- OUTPUT -->
  <div class="panel">
    <h3>Output Log</h3>
    <div id="output"></div>
  </div>

</div>

<script src="simulator.js"></script>
<script src="blackout_engine.js"></script>

<script>
const outputDiv = document.getElementById("output");

function logToUI(msg){
  const d = document.createElement("div");
  d.textContent = msg;
  outputDiv.appendChild(d);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

const oldLog = console.log;
console.log = function(...args){
  oldLog(...args);
  logToUI(args.join(" "));
};

function refresh(){
  document.getElementById("cooling").textContent = systemState.cooling.toFixed(2);
  document.getElementById("power").textContent = systemState.power.toFixed(2);
  document.getElementById("network").textContent = systemState.network.toFixed(2);
  document.getElementById("compute").textContent = systemState.compute.toFixed(2);
  document.getElementById("storage").textContent = systemState.storage.toFixed(2);
  document.getElementById("risk").textContent = systemState.overallRisk;
}

const oldUpdate = updateMetrics;

updateMetrics = function(){
  oldUpdate();
  refresh();
};

refresh();
</script>

</body>
</html>
