from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model, UserMixin):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolioId = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.String(5), nullable=False)
    action = db.Column(db.String(4), nullable=False)
    amount = db.Column(db.Numeric(10, 5), nullable=False)
    price = db.Column(db.Numeric(10, 5), nullable=False)
