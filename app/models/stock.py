from .db import db, environment, SCHEMA
from sqlalchemy import TypeDecorator, Numeric, types
from decimal import Decimal

class DecimalAsString(TypeDecorator):
    impl = Numeric

    def load_dialect_impl(self, dialect):
        return dialect.type_descriptor(types.VARCHAR(100))

    def process_bind_param(self, value, dialect):
        if value is not None:
            return str(value)
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            return Decimal(value)
        return value

class Stock(db.Model):
    __tablename__ = "stocks"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    name = db.Column(db.String(5), nullable=False, primary_key=True)
    portfolioId = db.Column(db.Integer, db.ForeignKey("portfolios.id"), nullable=False, primary_key=True)
    amount = db.Column(DecimalAsString, nullable=False)
    price = db.Column(DecimalAsString, nullable=False)

    # Relationship with Portfolio model
    portfolio = db.relationship("Portfolio", back_populates="stock")

    def to_dict(self):
        return {
            "name": self.name,
            "portfolioId": self.portfolioId,
            "amount": self.amount,
            "price": self.price
        }
