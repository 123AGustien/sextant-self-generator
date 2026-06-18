function generateModule(type, scenario = null) {

    // =============================
    // CORE MODULE REGISTRY
    // =============================
    const modules = {
        api: {
            name: "API MODULE",
            status: "generated",
            layer: "integration",
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
            layer: "execution",
            modes: ["stress", "cascade", "recovery"],
            engine: {
                deterministic: true,
                offline: true,
                scenario_based: true
            }
        },

        explanation: {
            name: "EXPLANATION ENGINE",
            status: "active",
            layer: "interpretation",
            transforms: "cascade → human readable system analysis"
        },

        risk: {
            name: "RISK ENGINE",
            status: "active",
            layer: "analysis",
            outputs: ["fx", "liquidity", "bank", "market", "confidence"]
        },

        default: {
            name: "DEFAULT MODULE",
            status: "created",
            layer: "fallback",
            modes: ["basic"],
            note: "Fallback module triggered due to unknown type"
        }
    };

    // =============================
    // MODULE SELECTION
    // =============================
    let result = modules[type] || modules.default;

    // =============================
    // SCENARIO OVERLAY LAYER
    // =============================
    if (scenario) {

        const enrichedScenario = {
            input: scenario,
            normalized: typeof scenario === "string"
                ? scenario.toLowerCase()
                : scenario,
            timestamp: new Date().toISOString()
        };

        result = {
            ...result,
            scenario: enrichedScenario,
            note: "Scenario overlay applied"
        };
    }

    // =============================
    // OUTPUT STANDARDIZATION LAYER
    // =============================
    return {
        meta: {
            timestamp: new Date().toISOString(),
            system: "Sextant v6.2",
            mode: "deterministic"
        },

        request: {
            type_requested: type,
            scenario_provided: !!scenario
        },

        module: result
    };
}
