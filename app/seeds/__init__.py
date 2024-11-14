from flask.cli import AppGroup
from .users import seed_users, undo_users
from .portfolios import seed_portfolios, undo_portfolios  # Import portfolio seed functions
from .stocks import seed_stocks, undo_stocks
from .watchlists import seed_watchlists, undo_watchlists
from .watchlist_stocks import seed_watchlist_stocks, undo_watchlist_stocks
from .transactions import seed_transactions, undo_transactions
from .orders import seed_orders, undo_orders

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, run the seed undo command,
        # which will truncate all tables prefixed with the schema name
        
        undo_orders()
        undo_transactions()
        undo_watchlist_stocks()
        undo_watchlists()
        undo_stocks()
        undo_portfolios()  
        undo_users()
    # Seed data for users and portfolios
    seed_users()
    seed_portfolios()  # Add portfolios seed function here
    seed_stocks()
    seed_watchlists()
    seed_watchlist_stocks()
    seed_transactions() 
    seed_orders()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_portfolios()  # Add portfolios undo function here
    undo_stocks()
    undo_watchlists()
    undo_watchlist_stocks()
    undo_transactions()
    undo_orders()
# from flask.cli import AppGroup
# from .users import seed_users, undo_users  # Import user seed functions
# from .portfolios import seed_portfolios, undo_portfolios  # Import portfolio seed functions
# from app.models.db import environment

# # Creates a seed group to hold our commands so we can type `flask seed --help`
# seed_commands = AppGroup('seed')

# # Creates the `flask seed all` command
# @seed_commands.command('all')
# def seed():
#     if environment == 'production':
#         # Before seeding in production, you want to run the seed undo command to truncate all tables.
#         undo_users()
#         undo_portfolios()
#     # Seed data for users and portfolios
#     seed_users()
#     seed_portfolios()

# # Creates the `flask seed undo` command
# @seed_commands.command('undo')
# def undo():
#     undo_portfolios()  # Undo portfolios first to avoid foreign key issues
#     undo_users()
