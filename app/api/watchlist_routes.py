from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.watchlist import Watchlist
from app.models.watchlist_stocks import WatchlistStock
import json
import requests
from datetime import date, timedelta
from decimal import Decimal
# from decimal import Decimal

# Define blueprint for watchlist stocks routes
watchlist_routes = Blueprint('watchlists', __name__)

# Get all user watchlists
@watchlist_routes.route('', methods=['GET'])
@login_required
def get_watchlist():
    watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()

    if not watchlists: 
        return jsonify({"message": "No watchlist found"}), 404
    # print(watchlists.watchlist_stock)
    return jsonify({"Watchlists": [item.to_dict() for item in watchlists]})
    

# Get watchlist by ID
@watchlist_routes.route('/<int:watchlist_id>', methods=['GET'])
@login_required
def get_watchlist_by_id(watchlist_id):
    watchlist = Watchlist.query.filter_by(id=watchlist_id).first()

    if not watchlist:
        return jsonify({"message": "Watchlist not found"}), 404
    
    return jsonify(watchlist.to_dict()), 200

# Create watchlist
@watchlist_routes.route('', methods=['POST'])
@login_required
def create_watchlist():
    req_body = json.loads(request.data)

    try:
        watchlist_new = Watchlist(
            user_id=current_user.id, 
            name=req_body['name']
        )

        db.session.add(watchlist_new)
        db.session.commit()

        return jsonify(watchlist_new.to_dict()), 201
    
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to create watchlist"}), 500

# Edit watchlist
@watchlist_routes.route('/<int:watchlist_id>', methods=['PUT'])
@login_required
def edit_watchlist(watchlist_id):
    # stock, action, amount, date, repeat = itemgetter('stock', 'action', 'amount', 'date', 'repeat')(json.loads(request.data))
    request_body = json.loads(request.data)

    try:
        watchlist_edit = Watchlist.query.filter_by(id=watchlist_id, user_id=current_user.id).first()

        if not watchlist_edit:
            return jsonify({"message": "watchlist not found"}), 404

        watchlist_edit.name = request_body['name']
        
        db.session.commit()

        return jsonify(watchlist_edit.to_dict()), 201
    
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to edit watchlist"}), 500

# Delete watchlist
@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
# @login_required
def delete_watchlist(watchlist_id):
    watchlist_delete = Watchlist.query.filter_by(id=watchlist_id, user_id=current_user.id).first()

    if not watchlist_delete:
        return jsonify({"message": "watchlist not found"}), 404

    db.session.delete(watchlist_delete)
    db.session.commit()

    return jsonify({'message': "Delete Successful"}), 200

def safeDay (day):
    if day.strftime('%A') == 'Sunday':
        yesterday = day - timedelta(2)
    elif day.strftime('%A') == 'Monday':
        yesterday = day - timedelta(3)
    else:
        yesterday = day - timedelta(1)
    return yesterday

# Add watchlist stock
@watchlist_routes.route('/<int:watchlist_id>/stocks', methods=['POST'])
@login_required
def create_watchlist_stock(watchlist_id):

    req_body = json.loads(request.data)

    try:
        symb = req_body['name'].upper()
        today = date.today()

        if today.strftime('%A') == 'Sunday':
            yesterday = today - timedelta(2)
        elif today.strftime('%A') == 'Monday':
            yesterday = today - timedelta(3)
        else:
            yesterday = today - timedelta(1)

        day2 = safeDay(yesterday)
        day3 = safeDay(day2)
        day4 = safeDay(day3)
        day5 = safeDay(day4)

        stock = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl')
        stock_prev = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{day5}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl')
        
        stock = stock.json()['preMarket']
        stock_prev = stock_prev.json()['afterHours']
        print(stock)
        print(stock_prev)
        
        change = round(abs(stock_prev-stock), 2)
        change_perc = round(stock_prev/stock, 2)

        if stock_prev-stock > 0:
            op = '+'
            color = 'green'
        else:
            op = '-'
            color = 'red'

        value = f'{op}${change} ({change_perc}%)'
    
        watchlist_stock_new = WatchlistStock(
            watchlist_id=watchlist_id, 
            name=req_body['name'],
            value= value,
            color=color
        )

        db.session.add(watchlist_stock_new)
        db.session.commit()

        watchlist_edit = Watchlist.query.filter_by(id=watchlist_id, user_id=current_user.id).first()

        if not watchlist_edit:
            return jsonify({"message": "watchlist not found"}), 404

        return jsonify(watchlist_edit.to_dict()), 201
    
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to add stock to watchlist"}), 500
    
# @watchlist_routes.route('', methods=['POST'])
# @login_required
# def add_to_watchlist():
#     """
#     Add a stock to the current user's watchlst
#     Request Body:
#     {
#         "stock": "GME"
#     }
#     """
#     try:
#         data = request.get_json()

#         stock = data.get('stock')

#         print(f"this is {stock}")

#         if not stock:
#             return jsonify({"message": "Please enter a stock symbol"}), 400
        
#         stock_is_on_watchlist = WatchlistStock.query.filter_by(user_id = current_user.id, stock=stock).first()

#         print(f"this {stock_is_on_watchlist} is ON IT")

#         if stock_is_on_watchlist:
#             return jsonify({"message": "Stock already on watchlist"}), 500
        
#         watchlist_entry = WatchlistStock(user_id=current_user.id, stock=stock)

#         db.session.add(watchlist_entry)
#         db.session.commit()

#         watchlist = WatchlistStock.query.filter_by(user_id=current_user.id).all()

#         return jsonify({"Watchlist": [item.to_dict() for item in watchlist]})
#     except Exception as e:
#         print(f"Error adding to wachlist {e}")
#         return jsonify({"message": "Failed to add stock to watchlist"}), 500
    
# Remove watchlist stock
@watchlist_routes.route('/<int:watchlist_id>/stocks', methods=['DELETE'])
@login_required
def delete_watchlist_stock(watchlist_id):

    req_body = json.loads(request.data)
    
    watchlist_stock_delete = WatchlistStock.query.filter_by(watchlist_id=watchlist_id, name=req_body['name']).first()
    
    if not watchlist_stock_delete:
        return jsonify({"message": "Watchlist stock not found"}), 404

    db.session.delete(watchlist_stock_delete)
    db.session.commit()

    watchlist_edit = Watchlist.query.filter_by(id=watchlist_id, user_id=current_user.id).first()

    if not watchlist_edit:
        return jsonify({"message": "watchlist not found"}), 404

    return jsonify(watchlist_edit.to_dict()), 200

# @watchlist_routes.route('', methods=['DELETE'])
# @login_required
# def remove_from_watchlist():
#     """
#     Remove a stock symbol for the current user's waatchlist

#     Request Body:
#     {
#         "stock": "GME
#     }
#     """
#     try:
#         data = request.get_json()
#         stock = data.get('stock')
#         if not stock:
#             return jsonify({"message": "Please enter a stock symbol"}), 400
#         stock_to_delete = WatchlistStock.query.filter_by(user_id = current_user.id, stock=stock).first()
#         if not stock_to_delete:
#             return jsonify({"message": "Watchlist stock couldn't be found"}), 404
        
#         db.session.delete(stock_to_delete)
#         db.session.commit()
#         watchlist = WatchlistStock.query.filter_by(user_id=current_user.id).all()
#         return jsonify({"Watchlist": [item.to_dict() for item in watchlist]})
#     except Exception as e:
#         return jsonify({"message": "Failed to remove from watchlist"}), 500