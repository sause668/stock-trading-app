from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.order import Order
from operator import itemgetter
import json
from datetime import datetime
# from decimal import Decimal

# Define blueprint for watchlist stocks routes
order_routes = Blueprint('order', __name__)

# Get all Orders by User
@order_routes.route('', methods=['GET'])
@login_required
def get_orders():
    orders = Order.query.filter_by(user_id=current_user.id).all()
    return jsonify(orders), 200

# Get Order by ID
@order_routes.route('/<int:order_id>', methods=['GET'])
@login_required
def get_order_by_id(order_id):
    order = Order.query.filter_by(id=order_id).first()

    if not order:
        return jsonify({"message": "Order not found"}), 404
    
    return jsonify(order.to_dict()), 200

# Create Order
@order_routes.route('', methods=['POST'])
@login_required
def create_order():
    req_body = json.loads(request.data)

    order_new = Order(
        portfolio_id=req_body['portfolioId'], 
        stock=req_body['stock'], 
        action=req_body['action'], 
        amount=req_body['amount'], 
        datetime=datetime.strptime(req_body['datetime'], "%H:%M"),
        repeat=req_body['repeat'] 
    )

    if not order_new:
        return jsonify({'message': 'validation error'}), 400

    db.session.add(order_new)
    db.session.commit()
    return jsonify(order_new.to_dict()), 201

# Edit Order
@order_routes.route('/<int:order_id>', methods=['PUT'])
@login_required
def edit_order(order_id):
    # stock, action, amount, date, repeat = itemgetter('stock', 'action', 'amount', 'date', 'repeat')(json.loads(request.data))
    request_body = json.loads(request.data)

    order_edit = Order.query.filter_by(id=order_id).first()

    if not order_edit:
        return jsonify({"message": "Order not found"}), 404

    order_edit.portfolio_id = request_body['portfolioId']
    order_edit.stock = request_body['stock']
    order_edit.action = request_body['action']
    order_edit.amount = request_body['amount']
    order_edit.datetime = request_body['datetime']
    order_edit.repeat = datetime.strptime(request_body['datetime'], "%y-%m-%d %H:%M"),
    
    
    db.session.commit()

    return jsonify(order_edit.to_dict()), 201


# Delete Order
@order_routes.route('/<int:order_id>', methods=['DELETE'])
# @login_required
def delete_order(order_id):
    order_delete = Order.query.filter_by(id=order_id).first()

    if not order_delete:
        return jsonify({"message": "Order not found"}), 404

    db.session.delete(order_delete)
    db.session.commit()

    return jsonify({'message': "Delete Successful"}), 200


