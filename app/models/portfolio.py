
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
    stock = db.relationship("Stock", back_populates="portfolio")
    transaction = db.relationship("Transaction", uselist=False, back_populates="portfolio")
    order = db.relationship("Order", uselist=False, back_populates="portfolio")
    

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "balance": float(self.money)
        }
