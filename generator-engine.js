function generateRepository(description) {
    const lower = description.toLowerCase();

    const base = {
        folder_name: "generated-project",
        files: {}
    };

    // CORE FILES ALWAYS INCLUDED
    base.files["index.html"] = generateIndexHTML(description);
    base.files["engine.js"] = generateEngineJS();
    base.files["README.md"] = generateReadme(description);

    // OPTIONAL STYLE FILE
    if (lower.includes("dashboard") || lower.includes("ui")) {
        base.files["styles.css"] = generateStyles();
    }

    // OPTIONAL ASSET FOLDER (logical placeholder)
    if (lower.includes("assets") || lower.includes("images")) {
        base.files["assets/placeholder.txt"] = "asset directory";
    }

    return base;

    
}

// ---------------- MODULE TEMPLATES ----------------

function generateIndexHTML(desc) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Generated Project</title>
</head>
<body>
    <h1>Generated System</h1>
    <p>${desc}</p>
    <button onclick="run()">Run</button>
    <pre id="out"></pre>

    <script src="engine.js"></script>
</body>
</html>
`;
}

function generateEngineJS() {
    return `
function run() {
    document.getElementById("out").textContent =
        "System executing... OK";
}
`;
}

function generateReadme(desc) {
    return `
# Generated Project

## Description
${desc}

## System
Offline deterministic generator output.

## Files
- index.html
- engine.js

`;
}

function generateStyles() {
    return `
body {
    background: #0b0f14;
    color: #00ff88;
    font-family: monospace;
}
`;
}
<div class="box">
    <h3>TEST GENERATOR</h3>

    <button onclick="runTest()">Run Generator</button>

    <pre id="output"></pre>
</div>

<script src="generator-engine.js"></script>

<script>
function runTest() {
    const result = generateRepository(
        "Create an offline crisis dashboard with scenario engine"
    );

    document.getElementById("output").textContent =
        JSON.stringify(result, null, 2);
}
</script>
