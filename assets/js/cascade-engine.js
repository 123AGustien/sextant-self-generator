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
