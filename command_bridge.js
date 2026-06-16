function runSystem() {
    const output = document.getElementById("output");

    const result = generateModule("api");

    output.textContent = JSON.stringify(result, null, 2);
}

function runSimulation() {
    const output = document.getElementById("output");

    const result = generateModule("simulator");

    output.textContent = JSON.stringify(result, null, 2);
}
