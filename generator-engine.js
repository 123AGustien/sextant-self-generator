function generateRepository(description) {
    const lower = description.toLowerCase();

    const base = {
        folder_name: "generated-project",
        files: {}
    };

    base.files["index.html"] = generateIndexHTML(description);
    base.files["engine.js"] = generateEngineJS();
    base.files["README.md"] = generateReadme(description);

    if (lower.includes("dashboard") || lower.includes("ui")) {
        base.files["styles.css"] = generateStyles();
    }

    if (lower.includes("assets") || lower.includes("images")) {
        base.files["assets/placeholder.txt"] = "asset directory";
    }

    return base;
}

// ---------------- TEMPLATES ----------------

function generateIndexHTML(desc) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Generated Project</title>
    <style>
        body {
            background: #0b0f14;
            color: #00ff88;
            font-family: monospace;
            padding: 20px;
        }
        button {
            background: #0b0f14;
            color: #00ff88;
            border: 1px solid #00ff88;
            padding: 10px;
            cursor: pointer;
        }
        pre {
            background: #05080c;
            padding: 12px;
            border: 1px solid #00ff88;
            margin-top: 10px;
        }
    </style>
</head>

<body>

<h1>Generated System</h1>
<p>${desc}</p>

<button onclick="run()">Run</button>

<pre id="out">Waiting...</pre>

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

## System Type
Offline deterministic repository generator output.

## Files
- index.html
- engine.js
- README.md
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
