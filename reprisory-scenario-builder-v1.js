/**
 * Reprisory Scenario Builder v1 (GLOBAL MODE)
 * Custom crisis configuration layer
 */

// =========================
// MAIN ENTRY
// =========================
function runCustomScenario(config = {}) {

  const scenario = {
    shockLevel: config.shockLevel || "medium",
    contagionStrength: config.contagionStrength || 1.0,
    policyAggression: config.policyAggression || "standard"
  };

  // =========================
  // APPLY SHOCK PRESETS
  // =========================
  const preset = getShockPreset(scenario.shockLevel);

  const finalConfig = {
    ...scenario,
    ...preset,
    ...config
  };

  // store globally (used by all engines)
  globalThis.REPRISORY_CONFIG = finalConfig;

  // =========================
  // RUN ORCHESTRATOR
  // =========================
  if (typeof runFullSystemCrisis !== "function") {
    console.error("Orchestrator missing");
    return null;
  }

  const result = runFullSystemCrisis("CUSTOM_SCENARIO");

  return {
    simulation: "reprisory-scenario-builder-v1",
    config: finalConfig,
    result
  };
}

// =========================
// SHOCK PRESETS
// =========================
function getShockPreset(level) {

  switch (level) {

    case "low":
      return {
        bankRunShock: 200,
        contagionMultiplier: 0.8
      };

    case "high":
      return {
        bankRunShock: 600,
        contagionMultiplier: 1.5
      };

    case "medium":
    default:
      return {
        bankRunShock: 300,
        contagionMultiplier: 1.0
      };
  }
}

// =========================
// GLOBAL EXPORT
// =========================
window.runCustomScenario = runCustomScenario;
