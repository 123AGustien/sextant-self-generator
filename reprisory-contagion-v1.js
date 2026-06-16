import { ReprisoryEngine } from "./reprisory/engine.js";

/**
 * Reprisory Contagion Engine v1
 * Simulates systemic failure across interconnected banks
 */

export function runContagionV1() {
  const engine = new ReprisoryEngine();

  // =========================
  // BANK NETWORK SETUP
  // =========================
  engine.addEntity("bankA", {
    assets: { cash: 1000, loans: 500 },
    liabilities: { deposits: 1200 },
    health: 1.0
  });

  engine.addEntity("bankB", {
    assets: { cash: 800, loans: 400 },
    liabilities: { deposits: 900 },
    health: 1.0
  });

  engine.addEntity("bankC", {
    assets: { cash: 600, loans: 300 },
    liabilities: { deposits: 700 },
    health: 1.0
  });

  // =========================
  // EXPOSURE MATRIX (simplified)
  // =========================
  const exposure = {
    bankA: { bankB: 200 },
    bankB: { bankC: 150 },
    bankC: { bankA: 100 }
  };

  // =========================
  // SHOCK EVENT (initial failure)
  // =========================
  engine.entities.bankA.assets.cash -= 1200; // bankA starts under stress

  // =========================
  // SIMULATION LOOP
  // =========================
  for (let t = 0; t < 10; t++) {

    Object.keys(engine.entities).forEach(bankId => {
      const bank = engine.entities[bankId];

      // STEP 1: compute solvency
      const net = bank.assets.cash - bank.liabilities.deposits;

      if (net < 0) {
        bank.health -= 0.3; // degradation
      }

      // STEP 2: contagion spread
      if (bank.health < 0.7) {
        const targets = exposure[bankId] || {};

        Object.keys(targets).forEach(targetId => {
          const loss = targets[targetId];

          if (engine.entities[targetId]) {
            engine.entities[targetId].assets.cash -= loss;
          }
        });
      }

      // STEP 3: collapse condition
      if (bank.health <= 0) {
        bank.assets.cash = 0;
        bank.liabilities.deposits *= 1.2; // panic amplification
      }
    });

    engine.tick();
  }

  // =========================
  // OUTPUT
  // =========================
  return {
    simulation: "reprisory-contagion-v1",
    status: "COMPLETE",
    history: engine.history
  };
}
