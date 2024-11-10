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

def safeDay (day):
    if day.strftime('%A') == 'Sunday':
        yesterday = day - timedelta(2)
    elif day.strftime('%A') == 'Monday':
        yesterday = day - timedelta(3)
    else:
        yesterday = day - timedelta(1)
    return yesterday

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
    yesterday = safeDay(today)
    stock = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()
    stock['ticker'] = requests.get(f'https://api.polygon.io/v3/reference/tickers/{symb}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()
    stock['related'] = requests.get(f'https://api.polygon.io/v1/related-companies/{symb}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()

    day2 = safeDay(yesterday)
    day2_data = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{day2}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()
    day3 = safeDay(day2)
    day3_data = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{day3}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()
    day4 = safeDay(day3)
    day4_data = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{day4}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()
    day5 = safeDay(day4)
    day5_data = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{day5}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()

    stock['chartData'] = [day5_data['preMarket'], day5_data['open'], day5_data['high'], day5_data['low'], day5_data['close'], day5_data['afterHours'],
                          day4_data['preMarket'], day4_data['open'], day4_data['high'], day4_data['low'], day4_data['close'], day4_data['afterHours'], 
                          day3_data['preMarket'], day3_data['open'], day3_data['high'], day3_data['low'], day3_data['close'], day3_data['afterHours'],
                          day2_data['preMarket'], day2_data['open'], day2_data['high'], day2_data['low'], day2_data['close'], day2_data['afterHours'],
                          stock['preMarket'], stock['open'], stock['high'], stock['low'], stock['close'], stock['afterHours']]
    stock['chartDays'] = [str(day5), str(day4), str(day3), str(day2), str(yesterday)]

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
    stock_data = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()
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
