const API_URL = "https://YOUR-REAL-BACKEND-URL/generate";

async function runGeneration() {
    const output = document.getElementById("output");

    try {
        output.innerText = "Running generator...";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: "api",
                name: "cascade_module"
            })
        });

        if (!response.ok) {
            throw new Error("Server returned error: " + response.status);
        }

        const data = await response.json();

        console.log("GENERATOR OUTPUT:", data);

        output.innerText = JSON.stringify(data, null, 2);

    } catch (error) {
        console.error("System Error:", error);

        output.innerText =
            "ERROR: Backend not connected or unavailable\n\n" +
            error.message;
    }
}
