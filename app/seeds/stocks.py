from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stocks():
    # 
    stock1 = Stock(portfolio_id=1, name="GME", amount=30, value=18.82)
    stock2 = Stock(portfolio_id=1, name="AAPL", amount=3, value=191.29)
    stock3 = Stock(portfolio_id=1, name="GOOGL", amount=5, value=176.63)

    # 
    db.session.add(stock1)
    db.session.add(stock2)
    db.session.add(stock3)
    
    # Commit changes to the database
    db.session.commit()

def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
