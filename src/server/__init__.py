from flask import Flask, jsonify, request, send_from_directory, render_template, make_response
import time

from jwtHandler import JWTHandler
from sql.user import User

app = Flask(__name__)
allowed_endpoints = [
    "/auth/login",
    "/static"
]

@app.before_request
def preflight():
    # If the request is not in the allowed endpoints
    if not any([request.path.startswith(i) for i in allowed_endpoints]):
        # If there is no authorization header
        if (jwt := request.cookies.get('authorization')) == None:
            return jsonify({"status": False, "message": "No authorization header"}), 401

        # If there was an error during decoding
        if (decoded_jwt := JWTHandler().decode(jwt)) == None:
            return jsonify({"status": False, "message": "Invalid authorization header"}), 401

        # Authendicate the token for time and internal validaty
        if not (status := User(-1).authendicate_jwt(jwt, decoded_jwt)):
            return jsonify({"status": False, "message": "Token expired"}), 401

@app.after_request
def finish_transaction(response):
    print("\n")
    return response

from routes.auth import bp as auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

from routes.dashboard import bp as dash_bp
app.register_blueprint(dash_bp, url_prefix="/dashboard")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)

