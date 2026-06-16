class ScaffoldEngine:

    def create_api(self, name):
        return f"""
from flask import Blueprint

{name}_bp = Blueprint("{name}", __name__)

@{name}_bp.route("/{name}")
def handler():
    return {{"module": "{name}", "status": "active"}}
"""

    def create_service(self, name):
        return f"""
class {name.capitalize()}Service:
    def run(self):
        return "{name} service running"
"""
