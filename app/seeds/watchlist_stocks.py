from app.models import db, WatchlistStock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlist_stocks():
    # 
    watchlist_stock1 = WatchlistStock(user_id=1, stock='GME')
    watchlist_stock2 = WatchlistStock(user_id=1, stock='GOOGL')
    watchlist_stock3 = WatchlistStock(user_id=1, stock='APPLE')

    # 
    db.session.add(watchlist_stock1)
    db.session.add(watchlist_stock2)
    db.session.add(watchlist_stock3)
    
    # Commit changes to the database
    db.session.commit()

def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()