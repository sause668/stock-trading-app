from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.watchlist_stock import WatchlistStock
# from decimal import Decimal

# Define blueprint for watchlist stocks routes
watchlist_routes = Blueprint('watchlist', __name__)

# GET: Retrieve all stocks on user watchlist
@watchlist_routes.route('', methods=['GET'])
@login_required
def get_watchlist():
    watchlist = WatchlistStock.query.filter_by(user_id=current_user.id).all()
    if watchlist: 
        return jsonify({"Watchlist": [item.to_dict() for item in watchlist]})
    return jsonify({"message": "No watchlist found"}), 404
    

@watchlist_routes.route('', methods=['POST'])
@login_required
def add_to_watchlist():
    """
    Add a stock to the current user's watchlst
    Request Body:
    {
        "stock": "GME"
    }
    """
    try:
        data = request.get_json()
        stock = data.get('stock')
        print(f"this is {stock}")
        if not stock:
            return jsonify({"message": "Please enter a stock symbol"}), 400
        stock_is_on_watchlist = WatchlistStock.query.filter_by(user_id = current_user.id, stock=stock).first()
        print(f"this {stock_is_on_watchlist} is ON IT")
        if stock_is_on_watchlist:
            return jsonify({"message": "Stock already on watchlist"}), 500
        watchlist_entry = WatchlistStock(user_id=current_user.id, stock=stock)
        db.session.add(watchlist_entry)
        db.session.commit()
        watchlist = WatchlistStock.query.filter_by(user_id=current_user.id).all()
        return jsonify({"Watchlist": [item.to_dict() for item in watchlist]})
    except Exception as e:
        print(f"Error adding to wachlist {e}")
        return jsonify({"message": "Failed to add stock to watchlist"}), 500
    

@watchlist_routes.route('', methods=['DELETE'])
@login_required
def remove_from_watchlist():
    """
    Remove a stock symbol for the current user's waatchlist

    Request Body:
    {
        "stock": "GME
    }
    """
    try:
        data = request.get_json()
        stock = data.get('stock')
        if not stock:
            return jsonify({"message": "Please enter a stock symbol"}), 400
        stock_to_delete = WatchlistStock.query.filter_by(user_id = current_user.id, stock=stock).first()
        if not stock_to_delete:
            return jsonify({"message": "Watchlist stock couldn't be found"}), 404
        
        db.session.delete(stock_to_delete)
        db.session.commit()
        watchlist = WatchlistStock.query.filter_by(user_id=current_user.id).all()
        return jsonify({"Watchlist": [item.to_dict() for item in watchlist]})
    except Exception as e:
        return jsonify({"message": "Failed to remove from watchlist"}), 500