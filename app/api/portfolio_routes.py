from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.portfolio import Portfolio
from decimal import Decimal

# Define blueprint for portfolio routes
portfolio_routes = Blueprint('portfolio', __name__)

# GET: Retrieve the current user's portfolio
@portfolio_routes.route('', methods=['GET'])
@login_required
def get_portfolio():
    #Check: Can't get the specific portfolio
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    if portfolio:
        return jsonify(portfolio.to_dict())
    return jsonify({"message": "Portfolio not found"}), 404

# POST: Create a new portfolio
@portfolio_routes.route('', methods=['POST'])
@login_required
def create_portfolio():
    data = request.get_json()
    initial_balance = data.get("initialBalance", 0.0)
    portfolio = Portfolio(user_id=current_user.id, money=initial_balance)
    db.session.add(portfolio)
    db.session.commit()
    return jsonify(portfolio.to_dict()), 201

# PUT: Update portfolio balance (add money)
@portfolio_routes.route('', methods=['PUT'])
@login_required
def update_portfolio():
    data = request.get_json()
    add_amount = Decimal(data.get("addAmount", 0.0))  # Convert to Decimal
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    if portfolio:
        portfolio.money += add_amount
        db.session.commit()
        return jsonify(portfolio.to_dict())
    return jsonify({"message": "Portfolio not found"}), 404

# DELETE: Delete the portfolio
@portfolio_routes.route('', methods=['DELETE'])
@login_required
def delete_portfolio():
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    if portfolio:
        db.session.delete(portfolio)
        db.session.commit()
        return jsonify({"message": "Portfolio deleted successfully"}), 200
    return jsonify({"message": "Portfolio not found"}), 404

# GET: Retrieve all portfolios for the current user
@portfolio_routes.route('/all', methods=['GET'])
@login_required
def get_all_user_portfolios():
    """
    Retrieve all portfolios for the current user.
    """
    portfolios = Portfolio.query.filter_by(user_id=current_user.id).all()
    return jsonify([portfolio.to_dict() for portfolio in portfolios])
# GET: Retrieve a specific portfolio by its ID for the current user
@portfolio_routes.route('/<int:portfolio_id>', methods=['GET'])
@login_required
def get_specific_portfolio(portfolio_id):
    portfolio = Portfolio.query.filter_by(id=portfolio_id, user_id=current_user.id).first()
    if portfolio:
        return jsonify(portfolio.to_dict())
    return jsonify({"message": "Portfolio not found"}), 404
