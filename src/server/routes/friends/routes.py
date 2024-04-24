from flask import render_template, redirect, flash, url_for, request, jsonify, make_response

from routes.friends import bp
from jwtHandler import JWTHandler
from sql.user import User
from sql.benchmark import Benchmark


@bp.route('/get_code', methods=["GET"])
def get_data():
    user_id = JWTHandler().decode(request.cookies.get('authorization'))["id"]

    user = User(user_id)
    friend_code = user.friend_code

    return jsonify({"status": True, "message": "Fetched data", "data": {"friend_code": friend_code}})

@bp.route('/add_friend', methods=["POST"])
def add_friend():
    user_id = JWTHandler().decode(request.cookies.get('authorization'))["id"]

    user = User(user_id)
    friend_code = request.json["friend_code"]

    print(friend_code)

    user.use_friend_code(friend_code)

    return jsonify({"status": True, "message": "Friend Requst Sent"})

@bp.route('/get_friends', methods=["GET"])
def get_friends():
    user_id = JWTHandler().decode(request.cookies.get('authorization'))["id"]

    user = User(user_id)
    friends = user.get_friends()

    print(friends)

    return jsonify({"status": True, "message": "Fetched data", "data": {"friends": friends}})
