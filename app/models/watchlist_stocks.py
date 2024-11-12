from .db import db, environment, SCHEMA, add_prefix_for_prod

class WatchlistStock(db.Model):
    __tablename__ = 'watchlist_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('watchlists.id')), nullable=False)
    name = db.Column(db.String(5), nullable=False)
    value = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(5), nullable=False)

    # Relationships
    watchlist = db.relationship("Watchlist", back_populates="watchlist_stock")

    def to_dict(self):
        return {
            'id': self.id,
            'watchlist_id': self.watchlist_id,
            'name': self.name,
            'value': self.value,
            'color': self.color
        }