from flask import render_template, redirect, flash, url_for, request, jsonify, make_response
import datetime

from routes.auth import bp
from sql.user import User


@bp.route('/login', methods=['POST'])
def login():
    username = request.json['user']
    password = request.json['pass']

    # Attempt to login the user, if found returns User object
    user = User(-1).login(username, password)

    if user:
        # Generate signed auth token to be validated later
        jwt = user.generate_jwt()

        # Create response object to be shared with the client in a readable format
        response = {
            "status": True,
            "message": "User logged in",
            "user": user.username
        }
        resp = make_response(jsonify(response))

        # Set the auth token as a cookie
        resp.set_cookie('authorization', jwt, path='/', samesite='Strict')
        return resp

    return jsonify({"status": False, "message": "User not recognised"})

@bp.route('/logout')
def logout():
    return jsonify({"status": True, "message": "User has been logged out"})

