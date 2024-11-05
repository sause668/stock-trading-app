from flask import Blueprint, request
from flask_login import login_required, current_user
import requests
from datetime import date, timedelta
from ..models import db

stock_routes = Blueprint('stocks', __name__)

# Get stock
@stock_routes.route('/<symb>')
def get_stocks(symb):
    symb = symb.upper()
    today = date.today()
    if today.strftime('%A') == 'Sunday':
        yesterday = today - timedelta(2)
    elif today.strftime('%A') == 'Monday':
        yesterday = today - timedelta(3)
    else:
        yesterday = today - timedelta(1)
    stock = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl')
    return stock.json()

# Purchase Stock
@stock_routes.route('/<symb>', methods=['POST', 'PUT'])
@login_required
def buy_stocks(symb):
    symb = symb.upper()
    today = date.today()
    if today.strftime('%A') == 'Sunday':
        yesterday = today - timedelta(2)
    elif today.strftime('%A') == 'Monday':
        yesterday = today - timedelta(3)
    else:
        yesterday = today - timedelta(1)
    stock = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl')
    stock = stock.json()
    if stock['status'] == 'OK':
        amt = 5
        purchased_stock = {
            'portfolio_id': '?',
            'stock': symb,
            'action': 'buy',
            'amount': amt,
            'price': stock['close'],
            'date_purchased': date.today()
        }
        if request.method == 'POST':
        #     db.session.add(purchased_stock)
        #     db.session.commit()
        # elif request.method == 'PUT':
            return purchased_stock
    else:
        return stock
# Sell stock 
@stock_routes.route('/<symb>', methods=['DELETE'])
# @login_required
def sell_stocks(symb):
    return 'Sucessfully Deleted'
