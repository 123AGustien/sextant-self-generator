function runSystem() {
    const output = document.getElementById("output");
    const risk = document.getElementById("risk");

    if (!output) return;

    const result = generateModule("api");

    output.textContent = JSON.stringify(result, null, 2);

    if (risk && typeof calculateRisk === "function") {
        risk.textContent = "Risk Index: LOW";
    }
}

function runSimulation() {
    const output = document.getElementById("output");
    const risk = document.getElementById("risk");

    if (!output) return;

    const result = generateModule("simulator");

    output.textContent = JSON.stringify(result, null, 2);

    if (risk && typeof calculateRisk === "function") {
        risk.textContent = "Risk Index: HIGH";
    }
}
