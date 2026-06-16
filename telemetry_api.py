
from flask import Blueprint

telemetry_bp = Blueprint("telemetry", __name__)

@telemetry_bp.route("/telemetry")
def handler():
    return {"module": "telemetry", "status": "active"}
