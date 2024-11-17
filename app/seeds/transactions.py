from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_transactions():
    # 
    transaction1 = Transaction(portfolio_id=1, stock="GME", action='buy', amount=10, price=18.82, date_created=datetime(2024, 5, 23, 13, 36))
    transaction2 = Transaction(portfolio_id=1, stock="AAPL", action='buy', amount=8, price=191.29, date_created=datetime(2024, 5, 30, 10, 12))
    transaction3 = Transaction(portfolio_id=1, stock="GOOG", action='buy', amount=15, price=176.63, date_created=datetime(2024, 6, 10, 11, 4))
    transaction4 = Transaction(portfolio_id=1, stock="GME", action='buy', amount=10, price=20.83, date_created=datetime(2024, 8, 7, 13, 42))
    transaction5 = Transaction(portfolio_id=1, stock="AAPL", action='sell', amount=5, price=226.78, date_created=datetime(2024, 10, 2, 14, 50))
    transaction6 = Transaction(portfolio_id=1, stock="GOOG", action='sell', amount=10, price=167.21, date_created=datetime(2024, 10, 3, 12, 48))
    transaction7 = Transaction(portfolio_id=1, stock="GME", action='buy', amount=10, price=20.50, date_created=datetime(2024, 10, 9, 13, 32))

    # 
    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    db.session.add(transaction4)
    db.session.add(transaction5)
    db.session.add(transaction6)
    db.session.add(transaction7)
    
    # Commit changes to the database
    db.session.commit()

def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()