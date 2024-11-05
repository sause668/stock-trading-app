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
    time = db.Column(db.DateTime, nullable=False)
    repeat = db.Column(db.Float, nullable=False)

    #Relationships
    portfolio = db.relationship("Portfolio", uselist=False, back_populates="order")