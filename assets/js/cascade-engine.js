
export function createCascadeEngine(){

    let system = {
        scenario: null,
        step: 0,
        risk: 0,
        intervention: null,
        timeline: []
    };

    let timer = null;

    function log(type, data){
        system.timeline.push({
            time: new Date().toISOString(),
            type,
            data
        });
    }

    function runScenario(type){

        const scenarios = {
            trade:{
                name:"US–China Trade Escalation",
                path:["FX Shock","Liquidity Stress","Confidence Loss"],
                base:75
            },
            taiwan:{
                name:"Taiwan Crisis",
                path:["Geo Shock","Volatility","Capital Flight"],
                base:95
            },
            energy:{
                name:"Energy Shock",
                path:["Oil Spike","Inflation","Tightening"],
                base:80
            },
            recession:{
                name:"Global Recession",
                path:["Demand Collapse","Credit Stress","Unemployment"],
                base:85
            }
        };

        system.scenario = scenarios[type];
        system.step = 0;
        system.risk = system.scenario.base;
        system.timeline = [];

        log("SCENARIO_START", system.scenario.name);

        startCascade();
    }

    function startCascade(){

        clearInterval(timer);

        timer = setInterval(() => {

            if(!system.scenario) return;

            if(system.step >= system.scenario.path.length){
                log("COMPLETE", true);
                clearInterval(timer);
                return;
            }

            let node = system.scenario.path[system.step];

            log("STEP", node);

            system.risk += 8;

            // Intervention logic
            if(system.intervention === "liquidity" && system.step >= 1){
                system.risk -= 25;
                log("INTERRUPT", "Liquidity stop");
                clearInterval(timer);
                return;
            }

            if(system.intervention === "central" && system.step >= 2){
                system.risk -= 35;
                log("STABILIZE", "Central bank action");
                clearInterval(timer);
                return;
            }

            system.step++;

        }, 1000);
    }

    function setIntervention(type){
        system.intervention = type;
        log("INTERVENTION", type);
    }

    function getState(){
        return system;
    }

    return {
        runScenario,
        setIntervention,
        getState
export function runCascadeSimulation(scenario) {

    const baseRisk =
        scenario.base || 80;

    const path = scenario.path || [];

    let risk = baseRisk;
    let timeline = [];

    for (let i = 0; i < path.length; i++) {

        let node = path[i];

        risk += 8;

        timeline.push({
            step: i,
            event: node,
            risk: risk
        });
    }

    return {
        finalRisk: risk,
        timeline: timeline,
        status:
            risk > 80 ? "CRITICAL"
            : risk > 50 ? "HIGH"
            : "STABLE"
    };
}
