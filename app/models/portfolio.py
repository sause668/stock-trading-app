from .db import db, environment, SCHEMA, add_prefix_for_prod

class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    money = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)

    # Relationships
    user = db.relationship("User", back_populates="portfolio")
    stock = db.relationship("Stock", back_populates="portfolio", cascade="all, delete-orphan")
    transactions = db.relationship("Transaction", back_populates="portfolio", cascade="all, delete-orphan")
    order = db.relationship("Order", back_populates="portfolio", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "balance": float(self.money),
            "transactions": [transaction.to_dict() for transaction in self.transactions]  # Optional, if you want to include transactions
        }
