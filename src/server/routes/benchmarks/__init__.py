from flask import Blueprint

bp = Blueprint('benchmarks', __name__)

from routes.benchmarks import routes
