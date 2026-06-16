const API_URL = "https://YOUR-DEPLOYED-API-URL/generate";

async function runGeneration() {
    try {
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

        const data = await response.json();

        console.log("GENERATOR OUTPUT:", data);

        document.getElementById("output").innerText =
            JSON.stringify(data, null, 2);

    } catch (error) {
        console.error("System Error:", error);
    }
}
