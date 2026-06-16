function generateModule(type, name) {

    if (type === "api") {
        return {
            file: name + "_api.py",
            content: `Flask API module for ${name}`
        };
    }

    if (type === "service") {
        return {
            file: name + "_service.py",
            content: `Service module for ${name}`
        };
    }

    return { error: "unknown type" };
}
