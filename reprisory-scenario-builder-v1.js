import { runFullSystemCrisis } from "./reprisory-orchestrator-v1.js";

/**
 * Reprisory Scenario Builder v1
 * Allows custom crisis configuration
 */

export function runCustomScenario(config = {}) {

  const scenario = {
    shockLevel: config.shockLevel || "medium",   // low | medium | high
    contagionStrength: config.contagionStrength || 1.0,
    policyAggression: config.policyAggression || "standard" // low | standard | aggressive
  };

  // =========================
  // APPLY SCENARIO PRESETS
  // =========================
  if (scenario.shockLevel === "low") {
    config.bankRunShock = 200;
  }

  if (scenario.shockLevel === "medium") {
    config.bankRunShock = 300;
  }

  if (scenario.shockLevel === "high") {
    config.bankRunShock = 600;
  }

  // attach config to global system state
  globalThis.REPRISORY_CONFIG = {
    ...scenario,
    ...config
  };

  // run full system with scenario context
  const result = runFullSystemCrisis("CUSTOM_SCENARIO");

  return {
    simulation: "reprisory-scenario-builder-v1",
    config: globalThis.REPRISORY_CONFIG,
    result
  };
}
