import requests
from flask import Blueprint, request, jsonify
from app import db, bcrypt, create_access_token
from app.models.user import User
import json
import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

auth_bp = Blueprint('auth', __name__)
SECRET_KEY =os.getenv('SECRET_KEY','1x0000000000000000000000000000000AA')
@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.json

    captcha_response = data.get('cf-turnstile-response')
    captcha_verify = requests.post('https://challenges.cloudflare.com/turnstile/v0/siteverify',
                                   data={
                                   'secret': SECRET_KEY,
                                   'response': captcha_response,
                                   }).json()
    if not captcha_verify.get('success'):
        return jsonify({"message":"CAPTCHA failed"}),400
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password, role=data['role'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": f"{data['role']} created successfully"}), 201

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        if data['role'] != user.role:
            return jsonify({"message": "Unauthorized"}),403
        identity = json.dumps({"username": user.username, "role": user.role})
        expires = timedelta(hours=12)
        access_token = create_access_token(identity=identity, expires_delta= expires)
        return jsonify(access_token=access_token,role=user.role), 200
    return jsonify({"message": "Invalid credentials"}), 401

