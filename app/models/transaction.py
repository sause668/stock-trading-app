from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable=False)
    stock = db.Column(db.String(5), nullable=False)
    action = db.Column(db.String(4), nullable=False)  # e.g., "buy" or "sell"
    amount = db.Column(db.Numeric(10, 5), nullable=False)
    price = db.Column(db.Numeric(10, 5), nullable=False)

    # Relationships
    portfolio = db.relationship("Portfolio", back_populates="transactions")

    def to_dict(self):
        return {
            "id": self.id,
            "portfolio_id": self.portfolio_id,
            "stock": self.stock,
            "action": self.action,
            "amount": float(self.amount),
            "price": float(self.price)
        }
