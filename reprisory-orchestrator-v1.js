import { runBankRunV1 } from "./reprisory-bankrun-v1.js";
import { runContagionV1 } from "./reprisory-contagion-v1.js";
import { runCentralBankIntervention } from "./reprisory-centralbank-v2.js";

/**
 * Reprisory Orchestrator v1
 * Full financial system simulation pipeline
 */

export function runFullSystemCrisis(mode = "BANK_RUN → CONTAGION → POLICY") {

  let stage1, stage2, stage3;

  // =========================
  // STAGE 1: BANK RUN
  // =========================
  stage1 = runBankRunV1();

  // Extract system state
  let state = {
    entities: stage1.history?.at(-1)?.entities || {}
  };

  // =========================
  // STAGE 2: CONTAGION
  // =========================
  stage2 = runContagionV1();

  state = {
    entities: stage2.history?.at(-1)?.entities || state.entities
  };

  // =========================
  // STAGE 3: CENTRAL BANK RESPONSE
  // =========================
  stage3 = runCentralBankIntervention(state);

  // =========================
  // FINAL OUTPUT
  // =========================
  return {
    simulation: "reprisory-full-system-orchestrator-v1",
    pipeline: mode,
    bankRun: stage1,
    contagion: stage2,
    policyResponse: stage3,
    finalState: stage3.finalState
  };
}
