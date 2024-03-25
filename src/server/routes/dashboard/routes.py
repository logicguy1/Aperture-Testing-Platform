from flask import render_template, redirect, flash, url_for, request, jsonify, make_response

from routes.dashboard import bp
from jwtHandler import JWTHandler
from sql.user import User


@bp.route('/get_data')
def get_data():
    user_id = JWTHandler().decode(request.cookies.get('authorization'))["id"]

    user = User(user_id)
    scores = user.get_scores()

    return jsonify({"status": True, "message": "Fetched data", "data": {
        "created": user.create_time,
        "scores": scores,
    }})
