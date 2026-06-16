import os
import json
from datetime import datetime


class ScaffoldEngine:

    def build(self, module_type, name):

        if module_type == "api":
            return self.api_template(name)

        if module_type == "service":
            return self.service_template(name)

        return "unknown module type"

    def api_template(self, name):
        return f"""
from flask import Blueprint

{name}_bp = Blueprint("{name}", __name__)

@{name}_bp.route("/{name}")
def handler():
    return {{"module": "{name}", "status": "active"}}
"""

    def service_template(self, name):
        return f"""
class {name.capitalize()}Service:
    def run(self):
        return "{name} service running"
"""


class EvolutionTracker:

    def log(self, module_type, name, filename):
        record = {
            "timestamp": datetime.utcnow().isoformat(),
            "module_type": module_type,
            "name": name,
            "file": filename,
            "version": "v1-evo"
        }

        with open("evolution_log.json", "a") as f:
            f.write(json.dumps(record) + "\n")


def write_file(filename, content):
    with open(filename, "w") as f:
        f.write(content)


def generate(module_type, name):
    engine = ScaffoldEngine()
    code = engine.build(module_type, name)

    filename = f"{name}_{module_type}.py"
    write_file(filename, code)

    EvolutionTracker().log(module_type, name, filename)

    return f"generated: {filename}"


def evolve_batch():
    """
    Controlled self-evolution cycle
    """
    tasks = [
        ("api", "navigation"),
        ("service", "navigation"),
        ("api", "telemetry"),
        ("service", "telemetry"),
    ]

    results = []

    for module_type, name in tasks:
        results.append(generate(module_type, name))

    return results


if __name__ == "__main__":
    output = evolve_batch()
    for o in output:
        print(o)
