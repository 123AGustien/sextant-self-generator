console.log("Blackout Engine v1 Loaded");

// =====================
// BLACKOUT STATE
// =====================
let blackoutActive = false;

// =====================
// BLACKOUT TRIGGER
// =====================
function triggerBlackout() {
  blackoutActive = true;

  // degrade all subsystems immediately
  systemState.cooling *= 0.55;
  systemState.power *= 0.40;
  systemState.network *= 0.60;
  systemState.compute *= 0.35;
  systemState.storage *= 0.50;

  console.log("⚫ BLACKOUT MODE ACTIVATED");

  if (typeof updateMetrics === "function") {
    updateMetrics();
  }

  if (typeof calculateRisk === "function") {
    calculateRisk();
  }
}

// =====================
// CONTINUOUS BLACKOUT DECAY LOOP
// =====================
function runBlackoutEngine() {
  if (!blackoutActive) return;

  // slow collapse drift
  systemState.cooling *= 0.985;
  systemState.power *= 0.975;
  systemState.network *= 0.990;
  systemState.compute *= 0.980;
  systemState.storage *= 0.985;

  // safety clamp
  Object.keys(systemState).forEach(k => {
    if (typeof systemState[k] === "number") {
      systemState[k] = Math.max(0, Math.min(1, systemState[k]));
    }
  });

  // refresh hooks (UI safe)
  if (typeof updateMetrics === "function") {
    updateMetrics();
  }

  if (typeof calculateRisk === "function") {
    calculateRisk();
  }
}

// =====================
// AUTO LOOP (SAFE TICK)
// =====================
setInterval(() => {
  runBlackoutEngine();
}, 1000);
