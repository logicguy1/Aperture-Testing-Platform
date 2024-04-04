from flask import render_template, redirect, flash, url_for, request, jsonify, make_response

from routes.benchmarks import bp
from jwtHandler import JWTHandler
from sql.user import User
from sql.benchmark import Benchmark


@bp.route('/get', methods=["POST"])
def get_data():
    user_id = JWTHandler().decode(request.cookies.get('authorization'))["id"]
    benchmark_id = request.json["id"]

    benchmark = Benchmark(benchmark_id)
    bell = benchmark.get_bell(user_id)
    print(bell)

    return jsonify({"status": True, "message": "Fetched data", "data": {"bell": bell}})

@bp.route('/save', methods=["POST"])
def save():
    user_id = JWTHandler().decode(request.cookies.get('authorization'))["id"]
    benchmark_id = request.json["id"]
    score = request.json["score"]

    benchmark = Benchmark(benchmark_id)
    benchmark.update_score(user_id, score)
    print(user_id)

    return jsonify({"status": True, "message": "Fetched data", "data": {
    }})
