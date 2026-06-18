/* =====================================================
   SEXTANT ROOT DIAGNOSTIC v1
   PHASE 4.5 – SELF TEST WIRING LAYER
   PURE FRONTEND (NO BACKEND)
===================================================== */

export function runRootDiagnostic() {

    const system = {
        runRP04: true,
        SextantBus: true,
        orchestra: true,
        runScenario: true
    };

    const engine = {
        loaded: typeof window !== "undefined",
        eventBus: typeof window !== "undefined",
        orchestra: typeof window !== "undefined",
        scenario: typeof window !== "undefined"
    };

    const frame = generateFrameFeed(system, engine);

    const state = {
        engine: engine.loaded ? "LOADED" : "FAILED",
        eventBus: engine.eventBus ? "LOADED" : "FAILED",
        orchestra: engine.orchestra ? "LOADED" : "FAILED",
        scenario: engine.scenario ? "LOADED" : "FAILED"
    };

    const output = {
        frame,
        state,
        verdict: computeVerdict(system, engine)
    };

    renderDiagnostic(output);

    return output;
}

/* =========================
   FRAME FEED GENERATOR
========================= */
function generateFrameFeed(system, engine) {

    return {
        timestamp: new Date().toISOString(),
        heartbeat: "waiting...",
        modules: {
            engine: engine.loaded,
            eventBus: engine.eventBus,
            orchestra: engine.orchestra,
            scenario: engine.scenario
        },
        flags: system
    };
}

/* =========================
   VERDICT ENGINE
========================= */
function computeVerdict(system, engine) {

    const score =
        Object.values(system).filter(Boolean).length +
        Object.values(engine).filter(Boolean).length;

    if (score >= 7) return "SYSTEM STABLE";
    if (score >= 5) return "SYSTEM DEGRADED";
    return "SYSTEM FAILURE";
}

/* =========================
   UI RENDER BINDING
========================= */
function renderDiagnostic(output) {

    const elFrame = document.getElementById("frameFeed") || document.getElementById("timeline");
    const elState = document.getElementById("systemState") || document.getElementById("io");
    const elLog = document.getElementById("log");
    const elEx = document.getElementById("explanationPanel");

    if (elFrame) {
        elFrame.innerText =
            "LIVE FRAME FEED\n" +
            JSON.stringify(output.frame, null, 2);
    }

    if (elState) {
        elState.innerText =
            JSON.stringify(output.state, null, 2);
    }

    if (elLog) {
        elLog.innerText =
            "VERDICT → " + output.verdict;
    }

    if (elEx) {
        elEx.innerText =
`🧭 ROOT DIAGNOSTIC REPORT

Engine: ${output.state.engine}
Event Bus: ${output.state.eventBus}
Orchestra: ${output.state.orchestra}
Scenario: ${output.state.scenario}

FINAL VERDICT:
${output.verdict}`;
    }
}
