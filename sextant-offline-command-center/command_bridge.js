function runSystem() {

    const result = generateModule("api", "cascade_module");

    console.log("OUTPUT:", result);

    document.getElementById("output").innerText =
        JSON.stringify(result, null, 2);
}
