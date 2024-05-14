from flask import render_template, redirect, flash, url_for, request, jsonify, make_response

from routes.dashboard import bp
from jwtHandler import JWTHandler
from sql.user import User
from sql.benchmark import Benchmark


@bp.route('/get_data/<user_id>')
def get_data(user_id):
    user_id = int(user_id)

    if user_id == -1:
        user_id = JWTHandler().decode(request.cookies.get('authorization'))["id"]
    print("id2", user_id)

    user = User(user_id)
    scores = user.get_scores()
    high_scores = [
        {
            "user_id": i["user_id"],
            "username": i["username"].capitalize(),
            "normalised_value": i["normalised_value"],
            "scores": User(i["user_id"]).get_scores(),
            "rank": idx + 1,
            "id": i["user_id"]
        } for idx, i in enumerate(Benchmark(-1).get_scoreboard())]

    out_scores = []
    for i in high_scores:
        score = i
        for score_data in i["scores"]:
            score[score_data["benchmark_name"]] = int(score_data["avg"])

        out_scores.append(
            score
        )

    return jsonify({"status": True, "message": "Fetched data", "data": {
        "name": user.username,
        "user_id": user.id,
        "created": user.create_time,
        "scores": scores,
        "high_scores": high_scores,
    }})
