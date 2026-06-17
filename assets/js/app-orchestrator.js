/* =========================
   SEXTANT APP ORCHESTRATOR
   PRODUCT RUNTIME + MONETISATION GATE
========================= */

import { createCascadeEngine } from "./cascade-engine.js";
import { createUIController } from "./ui-controller.js";
import { createLicensingEngine } from "./licensing-engine.js";
import { explainCascade } from "./explanation_engine.js";

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

        if(!features.interventionEngine && engine.setIntervention){
            engine.setIntervention = function(){
                console.warn("LOCKED FEATURE: Intervention Engine requires upgrade");
                return { success: false, message: "Upgrade required" };
            };
        }

        if(!features.apiAccess){
            window.SEXTANT_API = undefined;
        }

        if(!features.exportData){
            window.SEXTANT_EXPORT = function(){
                console.warn("Export locked: Upgrade required");
                return null;
            };
        }

        console.log("FEATURES ACTIVE:", features);
    }

    /* -------------------------
       EXPLANATION LAYER (CLEAN DESIGN)
    ------------------------- */

    function attachExplanationLayer(){

        const originalRun = engine.run || engine.generate || engine.execute;

        if(!originalRun){
            console.warn("No cascade execution method found for explanation layer");
            return;
        }

        engine.run = function(...args){

            const result = originalRun.apply(this, args);

            if(result && typeof result === "object"){
                result.explanation = explainCascade(result);
            }

            return result;
        };

        console.log("EXPLANATION ENGINE ACTIVE");
    }

    /* -------------------------
       BOOT SEQUENCE
    ------------------------- */

    ui.init();
    ui.bindUI();

    attachExplanationLayer();

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

    console.log("SEXTANT SYSTEM ONLINE v6.2 — MONETISATION + EXPLANATION LAYER ACTIVE");

})();
