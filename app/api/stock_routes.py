from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
import requests
from datetime import date, timedelta
from ..models import db
from ..models.stock import Stock
from ..models.portfolio import Portfolio
from decimal import Decimal

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
    # fetch stock
    stock = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl')
    stock = stock.json()
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    # if portfolio and stock exist purchase stock
    if portfolio and stock['status'] == 'OK':
        data = request.get_json()
        amt = Decimal(data.get('amount'))
        portfolio.money -= amt * Decimal(stock['close'])
        # currently works on postman but having an issue with Decimal when done through browser
        if request.method == 'POST':
            p_stock = Stock(name=symb, portfolioId=portfolio.id, amount=amt, price=stock['close'])
            db.session.add(p_stock)
            db.session.commit()
            return jsonify(p_stock.to_dict())
        # update existing stock if already owned
        elif request.method == 'PUT':
            u_stock = Stock.query.filter_by(portfolioId=portfolio.id, name=symb)
            u_stock.amount += amt
            u_stock.price = stock['close']
            portfolio.money -= amt
            db.session.commit()
            return jsonify(u_stock.to_dict())
    elif not portfolio:
        return jsonify({'message': 'Must create Portfolio first'}) 
    else:
        return stock

# Sell stock 
@stock_routes.route('/<symb>', methods=['DELETE'])
@login_required
def sell_stocks(symb):
    symb = symb.upper()
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    stock = Stock.query.filter_by(portfolioId=portfolio.id, name=symb).first()
    db.session.delete(stock)
    db.session.commit()
    return jsonify({"message": "Stock Sold"})
