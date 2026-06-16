import { ReprisoryEngine } from "./reprisory/engine.js";

/**
 * Reprisory Central Bank Intervention v2
 */

export function runCentralBankIntervention(systemState = {}) {

  const entities = systemState.entities || {};

  const centralBank = {
    policyRate: 5.0,
    liquidityPool: 5000
  };

  Object.values(entities).forEach(bank => {

    const net =
      bank.assets.cash -
      bank.liabilities.deposits;

    if (net < 0 && centralBank.liquidityPool > 0) {

      const support = Math.min(
        Math.abs(net),
        centralBank.liquidityPool
      );

      bank.assets.cash += support;

      centralBank.liquidityPool -= support;
    }
  });

  return {
    simulation: "reprisory-centralbank-v2",
    status: "COMPLETE",
    regime: "LIQUIDITY_SUPPORT",
    centralBank,
    finalState: entities
  };
}

// GLOBAL EXPORT
window.runCentralBankIntervention =
  runCentralBankIntervention;
