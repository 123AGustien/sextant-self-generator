export function runBankRunV1() {
  const engine = new ReprisoryEngine();

  engine.addEntity("bankA", {
    assets: { cash: 1000, loans: 500 },
    liabilities: { deposits: 1200 }
  });

  engine.addEntity("bankB", {
    assets: { cash: 800, loans: 300 },
    liabilities: { deposits: 900 }
  });

  const withdrawalShock = 300;
  const steps = 10;

  for (let t = 0; t < steps; t++) {

    Object.values(engine.entities).forEach(bank => {

      bank.assets.cash -= withdrawalShock;

      if (bank.assets.cash < 0) {
        bank.assets.cash = 0;
        bank.liabilities.deposits *= 1.1;
      }

    });

    engine.tick();
  }

  return {
    simulation: "reprisory-bankrun-v1",
    status: "COMPLETE",
    final_time: engine.time,
    history: engine.history
  };
}

// ✅ ADD THIS LINE ONLY
window.runBankRunV1 = runBankRunV1;
