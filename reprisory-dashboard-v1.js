import { runFullSystemCrisis } from "./reprisory-orchestrator-v1.js";

/**
 * Reprisory Dashboard v1
 * Visual control layer for financial system simulation
 */

let lastResult = null;

// =========================
// RUN FULL SYSTEM
// =========================
export function runDashboardSimulation() {
  lastResult = runFullSystemCrisis();

  renderDashboard(lastResult);

  return lastResult;
}

// =========================
// RENDER FUNCTION
// =========================
function renderDashboard(result) {

  const container = document.getElementById("dashboard");

  if (!container) {
    console.error("Dashboard container missing");
    return;
  }

  const riskScore = calculateRiskScore(result.finalState);

  container.innerHTML = `
    <h2>Reprisory Crisis Dashboard</h2>

    <p><strong>Simulation:</strong> ${result.simulation}</p>

    <p><strong>Risk Level:</strong> ${riskScore.level}</p>

    <p><strong>Central Bank Regime:</strong> ${result.policyResponse?.regime || "N/A"}</p>

    <p><strong>Policy Rate:</strong> ${result.policyResponse?.centralBank?.policyRate || "N/A"}</p>

    <p><strong>Liquidity Pool:</strong> ${result.policyResponse?.centralBank?.liquidityPool || "N/A"}</p>

    <pre style="background:#111;color:#0f0;padding:10px;overflow:auto;">
${JSON.stringify(result.finalState, null, 2)}
    </pre>
  `;
}

// =========================
// RISK ENGINE
// =========================
function calculateRiskScore(state) {
  let totalStress = 0;

  Object.values(state || {}).forEach(bank => {
    const net = bank.assets.cash - bank.liabilities.deposits;

    if (net < 0) totalStress += Math.abs(net);
  });

  if (totalStress < 500) return { level: "GREEN" };
  if (totalStress < 1500) return { level: "AMBER" };
  return { level: "RED" };
}
