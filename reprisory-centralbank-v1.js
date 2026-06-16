import { ReprisoryEngine } from "./reprisory/engine.js";

/**
 * Reprisory Central Bank Intervention Layer v2
 * Adds:
 * - Policy regime classification
 * - Central bank balance sheet
 * - Stabilized intervention logic
 */

export function runCentralBankIntervention(systemState, mode = "auto") {
  const engine = new ReprisoryEngine();

  engine.entities = JSON.parse(JSON.stringify(systemState.entities || {}));
  engine.history = [];

  // =========================
  // CENTRAL BANK BALANCE SHEET
  // =========================
  const centralBank = {
    reserves: 10000,
    liquidityPool: 5000,
    policyRate: 0.05
  };

  let liquidityInjection = 0;
  let regime = "GREEN";

  // =========================
  // STRESS CALCULATION
  // =========================
  function calculateStressLevel() {
    let stress = 0;

    Object.values(engine.entities).forEach(bank => {
      const net = bank.assets.cash - bank.liabilities.deposits;

      if (net < 0) stress += Math.abs(net);
      if (bank.health && bank.health < 0.7) stress += 200;
    });

    return stress;
  }

  // =========================
  // POLICY ENGINE
  // =========================
  function applyPolicy(stress) {

    if (stress < 500) {
      regime = "GREEN";
      centralBank.policyRate = 0.05;
      liquidityInjection = 0;
    }

    else if (stress < 1500) {
      regime = "AMBER";
      centralBank.policyRate = 0.03;
      liquidityInjection = 200;
    }

    else {
      regime = "RED";
      centralBank.policyRate = 0.01;
      liquidityInjection = Math.min(1000, centralBank.liquidityPool * 0.2);
    }

    // Deduct liquidity usage (no infinite printing)
    centralBank.liquidityPool -= liquidityInjection;
  }

  // =========================
  // SIMULATION LOOP
  // =========================
  for (let t = 0; t < 10; t++) {

    const stress = calculateStressLevel();
    applyPolicy(stress);

    Object.values(engine.entities).forEach(bank => {

      // interest impact
      const interestShock = centralBank.policyRate * bank.liabilities.deposits;
      bank.assets.cash -= interestShock;

      // liquidity floor behavior
      if (bank.assets.cash < 0) {
        bank.assets.cash = 0;
        bank.liabilities.deposits *= 1.05;
      }

      // controlled intervention (not runaway)
      if (liquidityInjection > 0) {
        bank.assets.cash += liquidityInjection * 0.1;
      }
    });

    engine.tick();
  }

  // =========================
  // OUTPUT
  // =========================
  return {
    simulation: "centralbank-intervention-v2",
    regime,
    centralBank,
    finalState: engine.entities,
    history: engine.history
  };
}
