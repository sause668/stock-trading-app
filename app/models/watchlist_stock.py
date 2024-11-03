from .db import db, environment, SCHEMA, add_prefix_for_prod

class WatchlistStock(db.Model):
    __tablename__ = 'watchlist_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.String(5), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'stock': self.stock
        }
    