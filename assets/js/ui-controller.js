/* =========================
   SEXTANT UI CONTROLLER
   PRESENTATION LAYER v6.2
   (SEPARATED FROM ENGINE)
========================= */

export function createUIController(engine){

    const outputEl = document.getElementById("output");
    const riskEl = document.getElementById("risk");
    const timelineEl = document.getElementById("timeline");
    const ioEl = document.getElementById("io");
    const logEl = document.getElementById("log");

    function render(){

        const state = engine.getState();

        const stability = Math.max(0, 100 - state.risk);

        /* -------------------------
           SCENARIO PATH OUTPUT
        ------------------------- */
        if(outputEl){
            outputEl.textContent = state.scenario
                ? state.scenario.path.slice(0, state.step)
                    .map(x => "→ " + x).join("\n")
                : "Idle";
        }

        /* -------------------------
           RISK DISPLAY
        ------------------------- */
        if(riskEl){
            riskEl.textContent = "Risk Index: " + state.risk;
        }

        /* -------------------------
           TIMELINE RENDER
        ------------------------- */
        if(timelineEl){
            timelineEl.textContent = state.timeline
                .map(t => `[${t.time}] ${t.type} → ${t.data}`)
                .join("\n");
        }

        /* -------------------------
           MAIN SYSTEM IO PANEL
        ------------------------- */
        if(ioEl){
            ioEl.textContent =
`STATUS: ACTIVE
SCENARIO: ${state.scenario?.name || "none"}
STEP: ${state.step}
RISK: ${state.risk}
STABILITY: ${stability.toFixed(1)}%
INTERVENTION: ${state.intervention || "none"}
EVENTS: ${state.timeline.length}`;
        }

        /* -------------------------
           INTERVENTION LOG
        ------------------------- */
        if(logEl && state.intervention){
            logEl.textContent = "ACTIVE: " + state.intervention;
        }

        /* -------------------------
           🧠 EXPLANATION LAYER OUTPUT
        ------------------------- */

        const explanation =
            state.scenario?.explanation ||
            state.explanation;

        if(explanation && logEl){

            logEl.textContent +=
                "\n\n--- EXPLANATION LAYER ---\n" +
                JSON.stringify(explanation, null, 2);
        }
    }

    function bindButtons(){

        const runButtons = document.querySelectorAll("[data-run-scenario]");
        runButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                engine.runScenario(btn.dataset.runScenario);
                render();
            });
        });

        const interventionButtons = document.querySelectorAll("[data-intervention]");
        interventionButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                engine.setIntervention(btn.dataset.intervention);
                render();
            });
        });
    }

    function init(){

        bindButtons();

        // auto-refresh loop (institutional dashboard style)
        setInterval(() => {
            render();
        }, 500);
    }

    return {
        init,
        render
    };
}
