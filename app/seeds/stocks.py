from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stocks():
    # 
    stock1 = Stock(portfolio_id=1, name="GME", amount=5, value=24.88)
    stock2 = Stock(portfolio_id=1, name="AAPL", amount=2.5, value=226.96)
    stock3 = Stock(portfolio_id=1, name="GOOGL", amount=3.75, value=178.35)

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
