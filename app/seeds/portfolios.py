# app/seeds/portfolios.py

from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text

def seed_portfolios():
    # Create sample portfolio entries for users with IDs 1,2, and 3
    portfolio1 = Portfolio(user_id=1, money=10000.00)
    portfolio2 = Portfolio(user_id=2, money=5000.00)
    portfolio3 = Portfolio(user_id=3, money=7500.00)

    # Add portfolios to the session
    db.session.add(portfolio1)
    db.session.add(portfolio2)
    db.session.add(portfolio3)
    
    # Commit changes to the database
    db.session.commit()

def undo_portfolios():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()
