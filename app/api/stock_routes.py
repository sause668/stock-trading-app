
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

# Function to make sure the day being called is a valid day
def safeDay (day):
    if day.strftime('%A') == 'Sunday':
        yesterday = day - timedelta(2)
    elif day.strftime('%A') == 'Monday':
        yesterday = day - timedelta(3)
    else:
        yesterday = day - timedelta(1)
    return yesterday

# Functions to determine the order to display the daily high and low
def higher (open, close):
    if open > close:
        return 'high'
    else:
        return 'low'
def lower (open, close):
    if open < close:
        return 'high'
    else:
        return 'low'

# Get all stocks for current user 
@stock_routes.route('/current')
@login_required
def get_user_stocks():
    today = date.today()
    yesterday = safeDay(today)
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    stocks = Stock.query.filter_by(portfolio_id=portfolio.id).all()
    return jsonify([{"name": stock.name, "amount": stock.amount, "value": stock.value, "newValue": requests.get(f'https://api.polygon.io/v1/open-close/{stock.name}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()['afterHours']} for stock in stocks])

# Get stock data from Polygonio.io API, includes 7 calls to API for additional data and historical data
@stock_routes.route('/<symb>')
def get_stocks(symb):
    symb = symb.upper()
    today = date.today()
    yesterday = safeDay(today)
    try:
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
    except: 
        return jsonify({'message': 'Unable to Connect to Polygon API'}) 
    # populate chart data with previous week's info
    if stock['status'] == 'OK':   
        stock['chartData'] = [day5_data['preMarket'], day5_data['open'], day5_data[higher(day5_data['open'],day5_data['close'])], day5_data[lower(day5_data['open'],day5_data['close'])], day5_data['close'], day5_data['afterHours'],
                            day4_data['preMarket'], day4_data['open'], day4_data[higher(day4_data['open'],day4_data['close'])], day4_data[lower(day4_data['open'],day4_data['close'])], day4_data['close'], day4_data['afterHours'], 
                            day3_data['preMarket'], day3_data['open'], day3_data[higher(day3_data['open'],day3_data['close'])], day3_data[lower(day3_data['open'],day3_data['close'])], day3_data['close'], day3_data['afterHours'],
                            day2_data['preMarket'], day2_data['open'], day2_data[higher(day2_data['open'],day2_data['close'])], day2_data[lower(day2_data['open'],day2_data['close'])], day2_data['close'], day2_data['afterHours'],
                            stock['preMarket'], stock['open'], stock[higher(stock['open'],stock['close'])], stock[lower(stock['open'],stock['close'])], stock['close'], stock['afterHours']]
        stock['chartDays'] = [str(day5), str(day4), str(day3), str(day2), str(yesterday)]

    return stock

# Purchase stock (buy stocks route)
@stock_routes.route('/<symb>', methods=['POST', 'PUT'])

# Get stock data from Polygonio.io API, includes 7 calls to API for additional data and historical data
@stock_routes.route('/<symb>')
def get_stocks(symb):
    symb = symb.upper()
    today = date.today()
    yesterday = safeDay(today)
    try:
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
    except: 
        return jsonify({'message': 'Unable to Connect to Polygon API'}) 
    # populate chart data with previous week's info
    if stock['status'] == 'OK':   
        stock['chartData'] = [day5_data['preMarket'], day5_data['open'], day5_data[higher(day5_data['open'],day5_data['close'])], day5_data[lower(day5_data['open'],day5_data['close'])], day5_data['close'], day5_data['afterHours'],
                            day4_data['preMarket'], day4_data['open'], day4_data[higher(day4_data['open'],day4_data['close'])], day4_data[lower(day4_data['open'],day4_data['close'])], day4_data['close'], day4_data['afterHours'], 
                            day3_data['preMarket'], day3_data['open'], day3_data[higher(day3_data['open'],day3_data['close'])], day3_data[lower(day3_data['open'],day3_data['close'])], day3_data['close'], day3_data['afterHours'],
                            day2_data['preMarket'], day2_data['open'], day2_data[higher(day2_data['open'],day2_data['close'])], day2_data[lower(day2_data['open'],day2_data['close'])], day2_data['close'], day2_data['afterHours'],
                            stock['preMarket'], stock['open'], stock[higher(stock['open'],stock['close'])], stock[lower(stock['open'],stock['close'])], stock['close'], stock['afterHours']]
        stock['chartDays'] = [str(day5), str(day4), str(day3), str(day2), str(yesterday)]

    return stock

# Purchase stock (buy stocks route)
@stock_routes.route('/<symb>', methods=['POST', 'PUT'])
@login_required
def buy_stocks(symb):
    symb = symb.upper()
    today = date.today()
    yesterday = safeDay(today)

    # Fetch stock data from polygon API
    stock_data = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()

    # Check if portfolio exists and stock data is valid
    if portfolio and stock_data['status'] == 'OK':
        data = request.get_json(force=True)
        amt = Decimal(data.get('amount'))
        value = Decimal(stock_data['afterHours']).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        portfolio.money -= (amt * value).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        
        if request.method == 'POST':
            p_stock = Stock(name=symb, portfolio_id=portfolio.id, amount=amt, value=value)
            db.session.add(p_stock)
            # Create transaction and add stock to portfolio
            transaction = Transaction(
                portfolio_id=portfolio.id,
                stock=symb,
                action='buy',
                amount=amt,
                value=value,
                date_created=today
            )
            db.session.add(transaction)
            db.session.commit()
            return jsonify(p_stock.to_dict())
        
        # Update existing stock if owned
        elif request.method == 'PUT':
            u_stock = Stock.query.filter_by(portfolio_id=portfolio.id, name=symb).first()
            action = data.get('action')
            u_stock.value = value
            
            # Update portfolio stock and money depending on action and create transaction
            transaction = Transaction(
                portfolio_id=portfolio.id,
                stock=symb,
                action=action,
                amount=amt,
                value=value,
                date_created=today
            )
            if action == 'buy':
                u_stock.amount += amt          
                portfolio.money -= amt * value
                # Update the transaction log
                db.session.add(transaction)
                db.session.commit()
                return jsonify(u_stock.to_dict())
            if action == 'sell':
                u_stock.amount -= amt          
                portfolio.money += amt * value
                # Update the transaction log
                if u_stock.amount == 0:
                    db.session.delete(u_stock)
                db.session.add(transaction)
                db.session.commit()
                if value > u_stock.value:
                    return jsonify({"message": f"You made ${Decimal((value * u_stock.amount)-(value * u_stock.amount)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}"})
                elif u_stock.value > value:
                    return jsonify({"message": f"You lost ${Decimal((value * u_stock.amount)-(value * u_stock.amount)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}"})
                elif value == u_stock.value:
                    return ({"message": "Stock sold at even value"})
    elif not portfolio:
        return jsonify({'message': 'Must create Portfolio first'}) 
    else:
        return stock_data

# Sell stock (sell stocks route)

# Sell stock (sell stocks route)
@stock_routes.route('/<symb>', methods=['DELETE'])
@login_required
def sell_stocks(symb):
    symb = symb.upper()
    today = date.today()
    yesterday = safeDay(today)

    # Fetch current stock data from polygon API
    stock_data = requests.get(f'https://api.polygon.io/v1/open-close/{symb}/{yesterday}?adjusted=true&apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl').json()
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    stock = Stock.query.filter_by(portfolio_id=portfolio.id, name=symb).first()
    
    if stock:
        # Calculate the amount to credit to the portfolio on stock sale
        sale_value = Decimal(stock_data['afterHours']).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        portfolio.money += (stock.amount * sale_value).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)

        # Log transaction for selling the stock
        transaction = Transaction(
            portfolio_id=portfolio.id,
            stock=symb,
            action='sell',
            amount=stock.amount,
            value=stock_data['afterHours'],
            date_created=date.today()
        )
        db.session.add(transaction)
        db.session.delete(stock)
        db.session.commit()
        
        db.session.commit()
        
        if sale_value > stock.value:
            return jsonify({"message": f"You made ${Decimal((sale_value * stock.amount)-(stock.value * stock.amount)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}"})
        elif stock.value > sale_value:
            return jsonify({"message": f"You lost ${Decimal((sale_value * stock.amount)-(stock.value * stock.amount)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}"})
        elif sale_value == stock.value:
            return ({"message": "Stock sold at even value"})
    
#     return jsonify({"message": "Stock not found"}), 404
    
    return jsonify({"message": "Stock not found"}), 404
