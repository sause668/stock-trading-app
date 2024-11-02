from flask import Blueprint
from flask_login import login_required
import requests
from datetime import date, timedelta
from ..models import db

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/<symb>')
def get_stocks(symb):
    symb = symb.upper()
    yesterday = date.today() - timedelta(1)
    stock = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl')
    return stock.json()

@stock_routes.route('/<symb>', methods=['POST'])
# @login_required
def buy_stocks(symb):
    symb = symb.upper()
    yesterday = date.today() - timedelta(1)
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
        # db.session.add(purchased_stock)
        # db.session.commit()
        return purchased_stock
    else:
        return stock
    
@stock_routes.route('/<symb>', methods=['PUT'])
@login_required
def update_stocks(symb, amt):
    symb = symb.upper()
    yesterday = date.today() - timedelta(1)
    stock = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl')
    stock = stock.json()
    purchased_stock = {
        'portfolio_id': '?',
        'stock': symb,
        'action': 'buy',
        'amount': amt,
        'price': stock.price,
        'date_purchased': date.today()
    }   
