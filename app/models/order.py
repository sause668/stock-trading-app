from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable=False)
    stock = db.Column(db.String(5), nullable=False)
    action = db.Column(db.String(4), nullable=False)
    amount = db.Column(db.Numeric(10, 5), nullable=False)
    datetime = db.Column(db.String(50), nullable=False)
    repeat = db.Column(db.Float, nullable=True)

    #Relationships
    portfolio = db.relationship("Portfolio", uselist=False, back_populates="order")

    def to_dict(self):
        return {
            "id": self.id,
            "portfolio_id": self.portfolio_id,
            "stock": self.stock,
            "action": self.action,
            "amount": self.amount,
            "datetime": self.datetime,
            "repeat": self.repeat
        }