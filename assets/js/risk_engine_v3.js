export function calculateRisk(nodes) {

    let sum = 0;

    for (let n of nodes) {
        sum += n.impact;
    }

    const score = Math.min((sum / nodes.length) * 100, 100);

    let level = "LOW";

    if (score > 80) level = "CRITICAL";
    else if (score > 60) level = "HIGH";
    else if (score > 40) level = "MODERATE";

    return {
        score: Math.round(score),
        level
    };
}
