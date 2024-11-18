from .db import db, environment, SCHEMA, add_prefix_for_prod

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="watchlist")
    watchlist_stock = db.relationship("WatchlistStock", uselist=True, back_populates="watchlist", cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'watchlist_stocks': [stock.to_dict() for stock in self.watchlist_stock]
        }
    