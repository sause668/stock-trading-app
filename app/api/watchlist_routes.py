from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.watchlist_stock import WatchlistStock
# from decimal import Decimal

# Define blueprint for watchlist stocks routes
watchlist_routes = Blueprint('watchlist', __name__)

# GET: Retrieve all stocks on user watchlist
@watchlist_routes.route('', methods=['GET'])
# @login_required
def get_watchlist():
    watchlist = WatchlistStock.query.all()
    # watchlist = WatchlistStock.query.filter_by(user_id=current_user.id)
    print('bah')
    print(watchlist)
    print('bah')
    return jsonify(watchlist)