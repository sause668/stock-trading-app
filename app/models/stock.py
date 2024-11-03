from .db import db, environment, SCHEMA

class Stock(db.Model):
    __tablename__ = "stocks"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(5), nullable=False, unique=True)
    portfolioId = db.Column(db.Integer, db.ForeignKey("portfolios.id"))
    amount = db.Column(db.Float, nullable=False)

    # Relationship with Portfolio model
    portfolio = db.relationship("Portfolio", back_populates="stock")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "portfolioId": self.portfolioId,
            "amount": self.amount
        }