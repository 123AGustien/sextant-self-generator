"""
Sextant Self Generator - GITMORE FILE
Single-file bundled version of the generator system
"""

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


def generate(module_type, name):
    engine = ScaffoldEngine()
    return engine.build(module_type, name)


if __name__ == "__main__":
    print(generate("api", "navigation"))
