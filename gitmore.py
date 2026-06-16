import os

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


def write_file(filename, content):
    with open(filename, "w") as f:
        f.write(content)


def generate(module_type, name):
    engine = ScaffoldEngine()
    code = engine.build(module_type, name)

    filename = f"{name}_{module_type}.py"
    write_file(filename, code)

    return f"generated: {filename}"


if __name__ == "__main__":
    print(generate("api", "navigation"))
    print(generate("service", "navigation"))
