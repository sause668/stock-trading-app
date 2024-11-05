from .db import db, environment, SCHEMA, add_prefix_for_prod

class WatchlistStock(db.Model):
    __tablename__ = 'watchlist_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    stock = db.Column(db.String(5), nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="watchlist_stock")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'stock': self.stock
        }
    