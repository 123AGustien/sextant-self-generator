export const NodeTypes = {
    FX_SHOCK: "FX_SHOCK",
    LIQUIDITY_STRESS: "LIQUIDITY_STRESS",
    BANKING_STRESS: "BANKING_STRESS",
    CONFIDENCE_LOSS: "CONFIDENCE_LOSS"
};

export function createCascade(input) {

    const text = input.toLowerCase();
    const nodes = [];

    if (text.includes("fx")) {
        nodes.push({ type: NodeTypes.FX_SHOCK, impact: 0.85 });
    }

    if (text.includes("liquidity")) {
        nodes.push({ type: NodeTypes.LIQUIDITY_STRESS, impact: 0.9 });
    }

    if (text.includes("bank")) {
        nodes.push({ type: NodeTypes.BANKING_STRESS, impact: 0.8 });
    }

    // always add baseline systemic stress
    nodes.push({ type: NodeTypes.CONFIDENCE_LOSS, impact: 0.6 });

    return nodes;
}
