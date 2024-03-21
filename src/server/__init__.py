from flask import Flask, jsonify, request, send_from_directory, render_template, make_response
import hashlib
import datetime
import time
import requests
import jwt

app = Flask(__name__)

@app.before_request
def preflight():
    print(request.path)

@app.after_request
def finish_transaction(response):
    print("\n")
    return response

from routes.auth import bp as auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)

