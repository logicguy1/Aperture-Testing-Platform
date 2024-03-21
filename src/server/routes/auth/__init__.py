from flask import Blueprint

bp = Blueprint('auth', __name__)

from routes.auth import routes
