from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
import requests
from datetime import date, timedelta
from ..models import db
from ..models.stock import Stock
from decimal import Decimal
from ..models.portfolio import Portfolio
from decimal import Decimal, ROUND_HALF_UP
from app.models.transaction import Transaction

stock_routes = Blueprint('stocks', __name__)

# Get all stocks for current user 
@stock_routes.route('/current')
@login_required
def get_user_stocks():
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    stocks = Stock.query.filter_by(portfolio_id=portfolio.id).all()
    return jsonify([{"name": stock.name, "amount": stock.amount} for stock in stocks])

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
    stock = stock.json()
    ticker = requests.get(f'https://api.polygon.io/v3/reference/tickers/{symb}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl')
    stock['ticker'] = ticker.json()
    return stock

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
        data = request.get_json(force=True)
        amt = Decimal(data.get('amount'))
        price = Decimal(stock_data['close']).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        portfolio.money -= (amt * price).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        
        if request.method == 'POST':
            p_stock = Stock(name=symb, portfolio_id=portfolio.id, amount=amt, price=price)
            db.session.add(p_stock)
            # Create transaction and add stock to portfolio
            transaction = Transaction(
                portfolio_id=portfolio.id,
                stock=symb,
                action='buy',
                amount=amt,
                price=price,
                date_created=today
            )
            db.session.add(transaction)
            db.session.commit()
            return jsonify(p_stock.to_dict())
        
        # Update existing stock if owned
        elif request.method == 'PUT':
            u_stock = Stock.query.filter_by(portfolio_id=portfolio.id, name=symb).first()
            action = data.get('action')
            u_stock.price = price
            
            # Update portfolio stock and money depending on action and create transaction
            if action == 'buy':
                u_stock.amount += amt          
                portfolio.money -= amt * price
            if action == 'sell':
                u_stock.amount -= amt          
                portfolio.money += amt * price

            transaction = Transaction(
                portfolio_id=portfolio.id,
                stock=symb,
                action=action,
                amount=amt,
                price=price,
                date_created=today
            )
            # Update the transaction log
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
    stock = Stock.query.filter_by(portfolio_id=portfolio.id, name=symb).first()
    
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
            price=stock.price,
            date_created=date.today()
        )
        db.session.add(transaction)
        db.session.delete(stock)
        db.session.commit()
        return jsonify({"message": "Stock Sold"})
    
    return jsonify({"message": "Stock not found"}), 404
