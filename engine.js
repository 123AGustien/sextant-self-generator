// Sextant Command Engine

function generateModule(type) {
  const modules = {
    api: {
      name: "API MODULE",
      status: "generated",
      endpoints: ["/init", "/execute", "/status"]
    },

    simulator: {
      name: "FAILURE SIMULATOR",
      status: "active",
      modes: ["stress", "cascade", "recovery"]
    },

    default: {
      name: "GENERIC MODULE",
      status: "created"
    }
  };

  return modules[type] || modules.default;
}

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
