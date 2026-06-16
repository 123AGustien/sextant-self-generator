import { ReprisoryEngine } from "./reprisory/engine.js";

/**
 * Reprisory Central Bank Intervention Layer v1
 * Responds to:
 * - Bank runs
 * - Contagion stress
 * - Systemic liquidity failure
 */

export function runCentralBankIntervention(systemState, mode = "auto") {
  const engine = new ReprisoryEngine();

  // Load incoming system state (from bank run or contagion)
  engine.entities = JSON.parse(JSON.stringify(systemState.entities || {}));
  engine.history = [];

  // =========================
  // POLICY VARIABLES
  // =========================
  let baseRate = 0.05;
  let liquidityInjection = 0;

  // =========================
  // SYSTEM STRESS ANALYSIS
  // =========================
  function calculateStressLevel() {
    let totalStress = 0;

    Object.values(engine.entities).forEach(bank => {
      const net = bank.assets.cash - bank.liabilities.deposits;

      if (net < 0) totalStress += Math.abs(net);
      if (bank.health && bank.health < 0.7) totalStress += 200;
    });

    return totalStress;
  }

  // =========================
  // POLICY RESPONSE FUNCTION
  // =========================
  function applyPolicy(stress) {

    // LOW stress: stable environment
    if (stress < 500) {
      baseRate = 0.05;
      liquidityInjection = 0;
    }

    // MEDIUM stress: preventive easing
    else if (stress < 1500) {
      baseRate = 0.03;
      liquidityInjection = 200;
    }

    // HIGH stress: crisis response
    else {
      baseRate = 0.01;
      liquidityInjection = 1000;

      // emergency liquidity support
      Object.values(engine.entities).forEach(bank => {
        bank.assets.cash += liquidityInjection * 0.3;
      });
    }
  }

  // =========================
  // SIMULATION LOOP (POLICY + SYSTEM)
  // =========================
  for (let t = 0; t < 10; t++) {

    const stress = calculateStressLevel();
    applyPolicy(stress);

    Object.values(engine.entities).forEach(bank => {

      // interest rate impact (simple stress amplifier)
      const interestShock = baseRate * bank.liabilities.deposits;
      bank.assets.cash -= interestShock;

      // liquidity floor
      if (bank.assets.cash < 0) {
        bank.assets.cash = 0;
        bank.liabilities.deposits *= 1.05;
      }

      // emergency stabilization
      if (liquidityInjection > 0) {
        bank.assets.cash += liquidityInjection * 0.1;
      }
    });

    engine.tick();
  }

  // =========================
  // OUTPUT POLICY RESULT
  // =========================
  return {
    simulation: "centralbank-intervention-v1",
    baseRate,
    liquidityInjection,
    finalState: engine.entities,
    history: engine.history
  };
}
