from flask import Blueprint

bp = Blueprint('friends', __name__)

from routes.friends import routes
