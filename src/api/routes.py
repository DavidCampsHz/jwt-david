"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from sqlalchemy import exc

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import timedelta

#Create flask app
api = Blueprint('api', __name__)

#---- api.route created originally in the file ----

#@api.route('/hello', methods=['POST', 'GET'])
#def handle_hello():

#    response_body = {
#        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#        }

#    return jsonify(response_body), 200

#CREATE USER
@api.route('/signup', methods=['POST']) #user creation
def create_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    password_hash = generate_password_hash(password)

    if not (email and password):
        return {"error": "Missing info"}, 400

    user = User(
        email = email,
        password = password_hash,
        is_active = True
    )

    try:
        user.create()
    
    except exc.IntegrityError: 
        return {"error":"something went wrong"}, 409
    account_created = User.get_by_email(email)
    
    if account_created: 
        token = create_access_token(identity=account_created.serialize(), expires_delta=timedelta(minutes=100)) 
        return {
            "token": token
        }, 200   

#GENERATE TOKEN
@api.route('/token', methods=['POST']) #login
def create_token():
    # read mail and password
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).filter_by(password=password)

    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity = email)
    return jsonify(access_token=access_token)

    
@api.route('/hello', methods=['GET']) #login
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    dictionary ={
        "message": "You are now logging Mr. " + email
    }
    return jsonify(dictionary)

# ---- previous code ----
    #user = User.get_by_email(email)
    # check that mail and password are correct

    #if user and check_password_hash(user.password, password):
    # return the token
    #    token = create_access_token(identity=email)
    #    return {"token": token}
    #else:
    #    return{"error": "user and password not valid"}, 400


