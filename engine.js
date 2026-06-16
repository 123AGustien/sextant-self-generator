function generateModule(type, scenario = null) {

    const modules = {
        api: {
            name: "API MODULE",
            status: "generated",
            endpoints: ["/init", "/execute", "/status"],
            capabilities: {
                authentication: true,
                logging: true,
                monitoring: true
            }
        },

        simulator: {
            name: "FAILURE SIMULATOR",
            status: "active",
            modes: ["stress", "cascade", "recovery"],
            engine: {
                deterministic: true,
                offline: true,
                scenario_based: true
            }
        },

        default: {
            name: "DEFAULT MODULE",
            status: "created",
            modes: ["basic"],
            note: "Fallback module triggered due to unknown type"
        }
    };

    let result = modules[type] || modules.default;

    // 🧠 SCENARIO LAYER (SAFE INJECTION)
    if (scenario) {
        result = {
            ...result,
            scenario: scenario,
            note: "Scenario overlay applied"
        };
    }

    return {
        timestamp: new Date().toISOString(),
        type_requested: type,
        module: result
    };
}
