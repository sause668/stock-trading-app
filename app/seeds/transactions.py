from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_transactions():
    # 
    transaction1 = Transaction(portfolio_id=1, stock="GME", action='buy', amount=5, price=4.75)
    transaction2 = Transaction(portfolio_id=1, stock="APPLE", action='buy', amount=2.5, price=20.5)
    transaction3 = Transaction(portfolio_id=1, stock="GOOGL", action='buy', amount=3.75, price=35.6)

    # 
    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    
    # Commit changes to the database
    db.session.commit()

def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()