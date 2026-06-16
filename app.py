from flask import Flask, request, jsonify
from scaffold_engine import ScaffoldEngine

app = Flask(__name__)
engine = ScaffoldEngine()

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json

    module_type = data.get("type")
    name = data.get("name")

    if module_type == "api":
        result = engine.create_api(name)

    elif module_type == "service":
        result = engine.create_service(name)

    else:
        result = {"error": "unknown type"}

    return jsonify(result)


@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "Sextant Generator Running",
        "mode": "offline-simulation"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
