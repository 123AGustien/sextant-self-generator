/* =========================
   SEXTANT APP ORCHESTRATOR
   PRODUCT RUNTIME + MONETISATION GATE
========================= */

import { createCascadeEngine } from "./cascade-engine.js";
import { createUIController } from "./ui-controller.js";
import { createLicensingEngine } from "./licensing-engine.js";

(function bootstrap(){

    /* -------------------------
       INIT CORE MODULES
    ------------------------- */

    const engine = createCascadeEngine();
    const license = createLicensingEngine();
    const ui = createUIController(engine, license);

    /* -------------------------
       LICENSE STATE
    ------------------------- */

    const state = license.getState();
    const features = license.getFeatureSet();

    /* -------------------------
       ENFORCEMENT LAYER
    ------------------------- */

    function enforceLimits(){

        // Block intervention engine if not allowed
        if(!features.interventionEngine && engine.setIntervention){
            const original = engine.setIntervention;

            engine.setIntervention = function(type){
                console.warn("LOCKED FEATURE: Intervention Engine requires upgrade");
                return {
                    success: false,
                    message: "Upgrade required"
                };
            };
        }

        // Block API exposure if not allowed
        if(!features.apiAccess){
            window.SEXTANT_API = undefined;
        }

        // Optional export restriction hook
        if(!features.exportData){
            window.SEXTANT_EXPORT = function(){
                console.warn("Export locked: Upgrade required");
                return null;
            };
        }

        console.log("FEATURES ACTIVE:", features);
    }

    /* -------------------------
       BOOT SEQUENCE
    ------------------------- */

    ui.init();
    ui.bindUI();

    enforceLimits();

    ui.render();
    ui.startAutoRender();

    /* -------------------------
       GLOBAL ACCESS (DEBUG / SaaS)
    ------------------------- */

    window.SEXTANT = {
        engine,
        license,
        ui,
        status: () => ({
            tier: license.getState().tier,
            risk: engine.getState().risk,
            scenario: engine.getState().scenario
        })
    };

    console.log("SEXTANT SYSTEM ONLINE v6.2 — MONETISATION LAYER ACTIVE");

})();
