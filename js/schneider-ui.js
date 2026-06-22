// ===============================
// SCHNEIDER UI BRIDGE
// ===============================

window.__log = function (msg) {
  const logBox = document.getElementById("log");
  if (!logBox) return;

  const div = document.createElement("div");
  div.textContent = msg;
  logBox.appendChild(div);
};

// render hook from engine
window.__render = function (state, tick) {
  const stateBox = document.getElementById("state");
  if (!stateBox) return;

  stateBox.textContent =
    `Tick: ${tick}\n` +
    `Cooling: ${state.cooling.toFixed(2)}\n` +
    `Power: ${state.power.toFixed(2)}\n` +
    `Network: ${state.network.toFixed(2)}\n` +
    `Compute: ${state.compute.toFixed(2)}\n` +
    `Storage: ${state.storage.toFixed(2)}\n` +
    `Risk: ${state.risk}`;
};
