/**
 * Reprisory Orchestrator v1 (GLOBAL MODE)
 * Full system pipeline: Bank Run → Contagion → Central Bank
 */

// =========================
// ORCHESTRATOR
// =========================
function runFullSystemCrisis(mode = "BANK_RUN → CONTAGION → POLICY") {

  // =========================
  // STAGE 1: BANK RUN
  // =========================
  const stage1 = window.runBankRunV1?.();

  if (!stage1) {
    console.error("runBankRunV1 missing");
    return null;
  }

  // derive state safely
  let state = {
    entities: stage1.entities || {}
  };

  // =========================
  // STAGE 2: CONTAGION
  // =========================
  const stage2 = window.runContagionV1?.();

  if (stage2?.finalState) {
    state.entities = stage2.finalState;
  }

  // =========================
  // STAGE 3: CENTRAL BANK
  // =========================
  const stage3 = window.runCentralBankIntervention?.(state);

  if (!stage3) {
    console.error("runCentralBankIntervention missing");
    return null;
  }

  // =========================
  // FINAL OUTPUT
  // =========================
  return {
    simulation: "reprisory-full-system-orchestrator-v1",
    pipeline: mode,
    bankRun: stage1,
    contagion: stage2,
    policyResponse: stage3,
    finalState: stage3.finalState || state.entities
  };
}

// =========================
// GLOBAL EXPORT
// =========================
window.runFullSystemCrisis = runFullSystemCrisis;
