from flask import render_template, redirect, flash, url_for, request, jsonify, make_response

from routes.auth import bp


@bp.route('/login', methods=['POST'])
def login():
    username = request.json['user']
    password = request.json['pass']

    print(username, password)

    if True:
        jwt = "Hellooo"
        response = {}
        response["status"] = True
        response["message"] = "User logged in"
        response["user"] = username
        resp = make_response(jsonify(response))
        print(response)
        resp.set_cookie('authorization', jwt, path='/', samesite='Strict')

        return resp

    return jsonify({"status": False, "message": "User not recognised"})

@bp.route('/logout')
def logout():
    return jsonify({"status": True, "message": "User has been logged out"})

