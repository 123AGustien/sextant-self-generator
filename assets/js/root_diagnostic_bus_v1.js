/* =====================================================
   SEXTANT ROOT DIAGNOSTIC v4.5 WIRED
   FRONTEND EVENT BUS + LIVE FRAME ENGINE
   NO BACKEND
===================================================== */

/* =========================
   GLOBAL STATE STORE
========================= */
const SextantState = {
    runRP04: true,
    SextantBus: true,
    orchestra: true,
    runScenario: true,

    engine: "LOADED",
    eventBus: "LOADED",
    orchestraStatus: "LOADED",
    scenarioStatus: "LOADED",

    frameTick: 0,
    logs: []
};

/* =========================
   EVENT BUS (REAL WIRED LAYER)
========================= */
const EventBus = {
    emit(event, data) {
        window.dispatchEvent(new CustomEvent(event, { detail: data }));
    },

    on(event, callback) {
        window.addEventListener(event, (e) => callback(e.detail));
    }
};

/* =========================
   FRAME GENERATOR (LIVE FEED)
========================= */
function generateFrame() {

    SextantState.frameTick++;

    const frame = {
        tick: SextantState.frameTick,
        timestamp: new Date().toISOString(),
        heartbeat: "ACTIVE",
        modules: {
            engine: SextantState.engine,
            eventBus: SextantState.eventBus,
            orchestra: SextantState.orchestraStatus,
            scenario: SextantState.scenarioStatus
        },
        systemFlags: {
            ...SextantState
        }
    };

    EventBus.emit("SEXTANT_FRAME", frame);

    return frame;
}

/* =========================
   ROOT DIAGNOSTIC ENGINE
========================= */
function runRootDiagnostic() {

    const diagnostic = {
        engine: SextantState.engine,
        eventBus: SextantState.eventBus,
        orchestra: SextantState.orchestraStatus,
        scenario: SextantState.scenarioStatus
    };

    EventBus.emit("SEXTANT_DIAGNOSTIC", diagnostic);

    startFrameLoop();
}

/* =========================
   LIVE FRAME LOOP
========================= */
let frameInterval = null;

function startFrameLoop() {

    clearInterval(frameInterval);

    frameInterval = setInterval(() => {
        const frame = generateFrame();

        SextantState.logs.push(frame);
        if (SextantState.logs.length > 20) {
            SextantState.logs.shift();
        }

    }, 1000);
}

/* =========================
   SCENARIO SIMULATION (OPTIONAL HOOK)
========================= */
function runScenario(input) {

    SextantState.scenarioStatus = "RUNNING";

    EventBus.emit("SEXTANT_SCENARIO", {
        input,
        status: "RUNNING"
    });
}

/* =========================
   BOOT SEQUENCE
========================= */
runRootDiagnostic();

/* expose for UI testing */
window.SextantBus = EventBus;
window.runScenario = runScenario;
window.SextantState = SextantState;
