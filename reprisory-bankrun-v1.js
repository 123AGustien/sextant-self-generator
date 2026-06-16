import { ReprisoryEngine } from "./reprisory/engine.js";

/**
 * Reprisory Bank Run Simulation v1
 * Financial systems stress test: liquidity withdrawal shock
 */

export function runBankRunV1() {
  const engine = new ReprisoryEngine();

  // =========================
  // INITIAL BANK SYSTEM STATE
  // =========================
  engine.addEntity("bankA", {
    assets: { cash: 1000, loans: 500 },
    liabilities: { deposits: 1200 }
  });

  engine.addEntity("bankB", {
    assets: { cash: 800, loans: 300 },
    liabilities: { deposits: 900 }
  });

  // =========================
  // STRESS PARAMETERS
  // =========================
  const withdrawalShock = 300;
  const steps = 10;

  // =========================
  // BANK RUN SIMULATION LOOP
  // =========================
  for (let t = 0; t < steps; t++) {

    Object.values(engine.entities).forEach(bank => {

      // Liquidity outflow (bank run pressure)
      bank.assets.cash -= withdrawalShock;

      // Failure condition: insolvency / liquidity collapse
      if (bank.assets.cash < 0) {
        bank.assets.cash = 0;

        // Panic amplification (deposit erosion effect)
        bank.liabilities.deposits *= 1.1;
      }

    });

    // Apply system dynamics (interest + time progression)
    engine.tick();
  }

  // =========================
  // OUTPUT RESULT
  // =========================
  return {
    simulation: "reprisory-bankrun-v1",
    status: "COMPLETE",
    final_time: engine.time,
    history: engine.history
  };
}
