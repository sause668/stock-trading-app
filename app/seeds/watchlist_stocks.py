from app.models import db, WatchlistStock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlist_stocks():
    # 
    watchlist1 = WatchlistStock(watchlist_id=1, name='TSLA', value='+$24.31 (8.19%)', color= 'green')
    watchlist2 = WatchlistStock(watchlist_id=1, name='NVDA', value='-$1.25 (0.84%)', color= 'red')
    watchlist3 = WatchlistStock(watchlist_id=1, name='DJT', value='+$4.21 (15.22%)', color= 'green')
    watchlist4 = WatchlistStock(watchlist_id=2, name='LCID', value='-$0.01 (0.45%)', color= 'red')
    watchlist5 = WatchlistStock(watchlist_id=2, name='PLTR', value='+$2.51 (4.49%)', color= 'green')
    watchlist6 = WatchlistStock(watchlist_id=2, name='SLFI', value='+$1.11 (9.33%)', color= 'green')
    
    # 
    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)
    db.session.add(watchlist4)
    db.session.add(watchlist5)
    db.session.add(watchlist6)
    
    # Commit changes to the database
    db.session.commit()

def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
    pass