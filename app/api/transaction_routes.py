# transaction_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.transaction import Transaction
from app.models.portfolio import Portfolio

transaction_routes = Blueprint('transactions', __name__)

# GET: View Transaction History
@transaction_routes.route('', methods=['GET'])
@login_required
def get_transaction_history():
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    if not portfolio:
        return jsonify({"message": "Portfolio not found"}), 404
    transactions = Transaction.query.filter_by(portfolio_id=portfolio.id).all()
    return jsonify([transaction.to_dict() for transaction in transactions])

# DELETE: Delete a specific transaction
@transaction_routes.route('/<int:transaction_id>', methods=['DELETE'])
@login_required
def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({"message": "Transaction deleted successfully"})
