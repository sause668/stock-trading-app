from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():
    # 
    watchlist1 = Watchlist(user_id=1, name='Hot Stocks')
    watchlist2 = Watchlist(user_id=1, name='Maybe Stocks')

    # 
    db.session.add(watchlist1)
    db.session.add(watchlist2)
    
    # Commit changes to the database
    db.session.commit()

def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
    pass