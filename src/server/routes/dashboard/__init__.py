from flask import Blueprint

bp = Blueprint('dashboard', __name__)

from routes.dashboard import routes
