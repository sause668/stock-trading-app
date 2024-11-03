from .db import db, environment, SCHEMA, add_prefix_for_prod

class WatchlistStock(db.Model, UserMixin):
    __tablename__ = 'watchlist_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock = db.Column(db.String(5), nullable=False)
    