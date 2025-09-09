from flask import Blueprint, request, jsonify

health_bp = Blueprint('health', __name__)

@health_bp.route('/health-check', methods=["GET"])
def heath_check():
    return jsonify({'status':'Up'}), 200

@health_bp.route('/api/healthz', methods = ["GET"])
def send_healthz():
    return jsonify({'status':'Up'}), 200
