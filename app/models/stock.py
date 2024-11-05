from .db import db, environment, SCHEMA

class Stock(db.Model):
    __tablename__ = "stocks"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(5), nullable=False, primary_key=True)
    portfolioId = db.Column(db.Integer, db.ForeignKey("portfolios.id"), nullable=False, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)

    # Relationship with Portfolio model
    portfolio = db.relationship("Portfolio", back_populates="stock")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "portfolioId": self.portfolioId,
            "amount": self.amount,
            "price": self.price
        }
