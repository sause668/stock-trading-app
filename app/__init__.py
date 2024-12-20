import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.portfolio_routes import portfolio_routes
from .api.auth_routes import auth_routes
from .api.stock_routes import stock_routes
from .api.watchlist_routes import watchlist_routes
from .api.order_routes import order_routes
from .seeds import seed_commands
from .config import Config
from .models.portfolio import Portfolio  # Ensure Portfolio model is imported
from .api.transaction_routes import transaction_routes

app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))
#Configure portfolio blueprint


#Transaction blueprint
app.register_blueprint(transaction_routes, url_prefix='/api/transactions')
# Register portfolio routes with URL prefix
app.register_blueprint(portfolio_routes, url_prefix='/api/portfolio')

# Register seed commands with Flask CLI
app.cli.add_command(seed_commands)

# Configure app and register blueprints
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(stock_routes, url_prefix='/api/stocks')
app.register_blueprint(watchlist_routes, url_prefix='/api/watchlists')
app.register_blueprint(order_routes, url_prefix='/api/orders')
db.init_app(app)
Migrate(app, db)
CORS(app)

# Application Security
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=True)
    return response

# API Documentation Route
@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list

# React App Routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

# Error Handling
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
