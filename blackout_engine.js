console.log("⚫ Blackout Engine Loaded");

// =====================
// BLACKOUT STATE
// =====================
let blackoutState = {
  active: false,
  severity: 0
};

// =====================
// TRIGGER BLACKOUT
// =====================
function triggerBlackout() {
  if (blackoutState.active) return;

  blackoutState.active = true;

  const avg =
    (systemState.cooling +
      systemState.power +
      systemState.network +
      systemState.compute +
      systemState.storage) / 5;

  blackoutState.severity = +(1 - avg).toFixed(2);

  console.log("⚠️ BLACKOUT MODE ACTIVATED");
  console.log("Severity:", blackoutState.severity);

  // initial collapse shock
  systemState.cooling *= 0.55;
  systemState.power   *= 0.55;
  systemState.network *= 0.55;
  systemState.compute *= 0.55;
  systemState.storage *= 0.55;
}

// =====================
// BLACKOUT TICK (DEGRADATION LOOP)
// =====================
function blackoutTick() {
  if (!blackoutState.active) return;

  const drift = 0.02 + Math.random() * 0.05;

  systemState.cooling = Math.max(0, systemState.cooling - drift);
  systemState.power   = Math.max(0, systemState.power - drift);
  systemState.network = Math.max(0, systemState.network - drift);
  systemState.compute = Math.max(0, systemState.compute - drift);
  systemState.storage = Math.max(0, systemState.storage - drift);

  console.log("⚫ Blackout Drift:", drift.toFixed(3));
}

// =====================
// FAILURE TERMINATION CHECK
// =====================
function checkSystemDeath() {
  const avg =
    (systemState.cooling +
      systemState.power +
      systemState.network +
      systemState.compute +
      systemState.storage) / 5;

  if (avg < 0.15) {
    console.log("💀 SYSTEM ENTERED FINAL FAILURE STATE");

    blackoutState.active = false;

    systemState = {
      cooling: 0,
      power: 0,
      network: 0,
      compute: 0,
      storage: 0,
      overallRisk: 1.0
    };
  }
}

// =====================
// ENGINE HOOK (CALL THIS IN MAIN LOOP)
// =====================
function runBlackoutEngine() {
  blackoutTick();
  checkSystemDeath();
}
