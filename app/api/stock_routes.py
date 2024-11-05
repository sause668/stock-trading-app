
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
import requests
from datetime import date, timedelta
from ..models import db
from ..models.stock import Stock
from decimal import Decimal
from ..models.portfolio import Portfolio
from decimal import Decimal
from app.models.transaction import Transaction

stock_routes = Blueprint('stocks', __name__)

# Get stock data
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

# Purchase stock (buy stocks route)
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

    # Fetch stock data from polygon API
    stock_data = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl')
    stock_data = stock_data.json()
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()

    # Check if portfolio exists and stock data is valid
    if portfolio and stock_data['status'] == 'OK':
        data = request.get_json()
        amt = Decimal(data.get('amount'))
        price = Decimal(stock_data['close'])
        portfolio.money -= amt * price

        # Create transaction and add stock to portfolio
        if request.method == 'POST':
            p_stock = Stock(name=symb, portfolioId=portfolio.id, amount=amt, price=price)
            transaction = Transaction(
                portfolio_id=portfolio.id,
                stock=symb,
                action='buy',
                amount=amt,
                price=price
            )
            db.session.add(p_stock)
            db.session.add(transaction)
            db.session.commit()
            return jsonify(p_stock.to_dict())
        
        # Update existing stock if owned
        elif request.method == 'PUT':
            u_stock = Stock.query.filter_by(portfolioId=portfolio.id, name=symb).first()
            u_stock.amount += amt
            u_stock.price = price
            portfolio.money -= amt * price
            
            # Update the transaction log
            transaction = Transaction(
                portfolio_id=portfolio.id,
                stock=symb,
                action='buy',
                amount=amt,
                price=price
            )
            db.session.add(transaction)
            db.session.commit()
            return jsonify(u_stock.to_dict())
    elif not portfolio:
        return jsonify({'message': 'Must create Portfolio first'}) 
    else:
        return stock_data

# Sell stock (sell stocks route)
@stock_routes.route('/<symb>', methods=['DELETE'])
@login_required
def sell_stocks(symb):
    symb = symb.upper()
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    stock = Stock.query.filter_by(portfolioId=portfolio.id, name=symb).first()
    
    if stock:
        # Calculate the amount to credit to the portfolio on stock sale
        sale_price = stock.price * stock.amount
        portfolio.money += Decimal(sale_price)

        # Log transaction for selling the stock
        transaction = Transaction(
            portfolio_id=portfolio.id,
            stock=symb,
            action='sell',
            amount=stock.amount,
            price=stock.price
        )
        db.session.add(transaction)
        db.session.delete(stock)
        db.session.commit()
        return jsonify({"message": "Stock Sold"})
    
    return jsonify({"message": "Stock not found"}), 404
