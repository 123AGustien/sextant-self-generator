/**
 * Reprisory Bank Run Simulation v1 (GLOBAL MODE)
 * MUST expose function to window for UI binding layer
 */

function runBankRunV1() {

    const engine = {
        time: 0,
        history: [],
        entities: {}
    };

    // =========================
    // INITIAL BANK STATE
    // =========================
    engine.entities.bankA = {
        assets: { cash: 1000, loans: 500 },
        liabilities: { deposits: 1200 }
    };

    engine.entities.bankB = {
        assets: { cash: 800, loans: 300 },
        liabilities: { deposits: 900 }
    };

    // =========================
    // PARAMETERS
    // =========================
    const withdrawalShock = 300;
    const steps = 10;

    // =========================
    // SIMULATION LOOP
    // =========================
    for (let t = 0; t < steps; t++) {

        Object.values(engine.entities).forEach(bank => {

            // liquidity drain
            bank.assets.cash -= withdrawalShock;

            // insolvency condition
            if (bank.assets.cash < 0) {
                bank.assets.cash = 0;

                // panic amplification
                bank.liabilities.deposits *= 1.1;
            }
        });

        engine.time++;

        // log snapshot
        engine.history.push({
            t: engine.time,
            state: JSON.parse(JSON.stringify(engine.entities))
        });
    }

    // =========================
    // OUTPUT
    // =========================
    return {
        simulation: "reprisory-bankrun-v1",
        status: "complete",
        final_time: engine.time,
        entities: engine.entities,
        history: engine.history
    };
}

// =========================
// GLOBAL EXPORT (CRITICAL FOR UI)
// =========================
window.runBankRunV1 = runBankRunV1;
