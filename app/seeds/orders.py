from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_orders():
    # 
    print(datetime(2024, 12, 3, 10, 35))
    order1 = Order(
        portfolio_id=1, 
        stock='GME', 
        action='buy', 
        amount=3, 
        datetime=datetime(2024, 12, 3, 10, 35)
        )

    # 
    db.session.add(order1)
    
    # Commit changes to the database
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()