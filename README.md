# HoneyStock
## About
HoneyStock is a Robinhood clone site developed as part of our curriculum at App Academy.
Live Link https://stock-trading-app-qlg7.onrender.com/
## Technologies used 
### Languages
* JavaScript
* Python
* PostgreSQL
* HTML/CSS
### Libraries
* Docker
* React
* Redux
* Chart.js
* Flask
* SQLAlchemy
* Alembic
* WTForms

* The stock data is retrieved from the https://polygon.io API
* The site was deployed using render.com

## Future Features
* Orders - allowing users to purchase stocks at a set future time.

## Screenshots
## User Page
![Screenshot 2024-11-18 215354](https://github.com/user-attachments/assets/5e161be4-0f60-42e5-bdf5-ba5e74682af1)
## Stock Page
![Screenshot 2024-11-18 215748](https://github.com/user-attachments/assets/cbbf0a55-6ad0-4663-a699-7eede0dc03e1)
![Screenshot 2024-11-18 215816](https://github.com/user-attachments/assets/a0076941-66a3-4b44-80e7-9f9795bdebe5)

## Endpoints
| Request | Purpose | Return Value |
| --- | --- | --- |
|  `GET /api/portfolio` | Returns information about the current user's portfolio. | <pre>{<br />  "portfolio": {<br />    "id": 1,<br />    "userId": 1,<br />    "balance": 10000.00,<br />    "assets": [<br />      {<br />        "symbol": "AAPL",<br />        "shares": 10,<br />        "currentValue": 1500.00<br />      },<br />      {<br />        "symbol": "GOOGL",<br />        "shares": 5,<br />        "currentValue": 2500.00<br />      }<br />    ]<br />  }<br />}</pre> |
| `POST /api/portfolio` | Allows a user to create a new portfolio. | <pre>{<br />  "portfolio": {<br />    "id": 1,<br />    "userId": 1,<br />    "balance": 10000.00,<br />    "assets": []<br />  }<br />}</pre> |
| `PUT /api/portfolio` | Allows a user to add fake money to their portfolio. | <pre>{<br />  "portfolio": {<br />    "id": 1,<br />    "userId": 1,<br />    "balance": 10500.00<br />  }<br />}</pre> |
| `DELETE /api/portfolio` | Allows a user to delete their portfolio (selling all stocks). | <pre>{<br />  "message": "Portfolio deleted successfully"<br />}</pre> |
| `GET /api/stocks/:symb` | Returns stock details. | <pre>{<br />  "status": "OK",<br />  "from": "2024-10-25",<br />  "symbol": "AAPL",<br />  "open": 229.74,<br />  "high": 233.22,<br />  "low": 229.57,<br />  "close": 231.41,<br />  "volume": 36791251,<br />  "afterHours": 230.86,<br />  "preMarket": 229.13<br />}</pre> |
| `POST /api/stocks/:symb` | Adds a stock to the user's portfolio. | <pre>{<br />  "portfolio_id": 1,<br />  "user_id": 1,<br />  "money": 500.00<br />}</pre> |
| `PUT /api/stocks/:symb` | Updates the amount of stock a user owns in their portfolio. | <pre>{<br />  "portfolio_id": 1,<br />  "user_id": 1,<br />  "money": 500.00<br />}</pre> |
| `DELETE /api/stocks/symb` | Deletes a stock from the user's portfolio. | <pre>{<br />  "message": "Stock sold"<br />}</pre> |
| `GET /api/watchlists` | Returns information about the current user's watchlists. | <pre>{<br />  "Watchlists": [<br />    {<br />      "id": 1,<br />      "user_id": 1,<br />      "name": "Hot Stocks",<br />      "watchlist_stocks": [<br />        {<br />          "id": 1,<br />          "name": "TSLA",<br />          "value": 24.31<br />        },<br />        {<br />          "id": 2,<br />          "name": "NVDA",<br />          "value": -1.25<br />        },<br />        {<br />          "id": 3,<br />          "name": "DJT",<br />          "value": 4.21<br />        }<br />      ]<br />    },<br />    {<br />      "id": 2,<br />      "user_id": 1,<br />      "name": "Maybe Stocks",<br />      "watchlist_stocks": [<br />        {<br />          "id": 4,<br />          "name": "LCID",<br />          "value": -0.01<br />        },<br />        {<br />          "id": 5,<br />          "name": "PLTR",<br />          "value": 2.51<br />        },<br />        {<br />          "id": 6,<br />          "name": "SOFI",<br />          "value": 1.11<br />        }<br />      ]<br />    }<br />  ]<br />}</pre> |
| `GET /api/watchlists/:watchlist_id` | Returns information about a single watchlist. | <pre>{<br />  "id": 1,<br />  "user_id": 1,<br />  "name": "Hot Stocks",<br />  "watchlist_stocks": [<br />    {<br />      "id": 1,<br />      "name": "TSLA",<br />      "value": 24.31<br />    },<br />    {<br />      "id": 2,<br />      "name": "NVDA",<br />      "value": -1.25<br />    },<br />    {<br />      "id": 3,<br />      "name": "DJT",<br />      "value": 4.21<br />    }<br />  ]<br />}</pre> |
| `POST /api/watchlists` | Allows a user to create a new watchlist. | <pre>{<br />  "id": 3,<br />  "user_id": 1,<br />  "name": "New Stocks",<br />  "watchlist_stocks": []<br />}</pre> |
| `PUT /api/watchlists/:watchlist_id` | Allows a user to rename one of their watchlists. | <pre>{<br />  "id": 3,<br />  "user_id": 1,<br />  "name": "Old Stocks",<br />  "watchlist_stocks": []<br />}</pre> | 
| `DELETE /api/watchlists/:watchlist_id` | Allows a user to delete one of their watchlists. | <pre>{<br />  "message": "Delete successful"<br />}</pre> |
| `POST /api/watchlists/:watchlist_id/stocks` | Allows a user to add a stock to one of their watchlists. | <pre>{<br />  "id": 1,<br />  "user_id": 1,<br />  "name": "Hot Stocks",<br />  "watchlist_stocks": [<br />    {<br />      "id": 1,<br />      "name": "TSLA",<br />      "value": 24.31<br />    },<br />    {<br />      "id": 2,<br />      "name": "NVDA",<br />      "value": -1.25<br />    },<br />    {<br />      "id": 3,<br />      "name": "DJT",<br />      "value": 4.21<br />    },<br />    {<br />      "id": 7,<br />      "name": "INTC",<br />      "value": -0.03<br />    }<br />  ]<br />}</pre> |
| `DELETE /api/watchlists/:watchlist_id/stocks` | Allows a user to delete a stock from one of their watchlists. | <pre>{<br />  "id": 1,<br />  "user_id": 1,<br />  "name": "Hot Stocks",<br />  "watchlist_stocks": [<br />    {<br />      "id": 2,<br />      "name": "NVDA",<br />      "value": -1.25<br />    },<br />    {<br />      "id": 3,<br />      "name": "DJT",<br />      "value": 4.21<br />    },<br />    {<br />      "id": 7,<br />      "name": "INTC",<br />      "value": -0.03<br />    }<br />  ]<br />}</pre> |
| `GET /api/transactions` | Returns information about the current user's transaction history. | <pre>{<br />  "Transactions": [<br />    {<br />      "id": 1,<br />      "portfolioID": 1,<br />      "stock": "GME",<br />      "action": "buy",<br />      "amount": 12,<br />      "price": 7.51,<br />      "DateCreated": "2024-10-30T11:15:00.000Z"<br />    },<br />    {<br />      "id": 2,<br />      "portfolioID": 1,<br />      "stock": "GME",<br />      "action": "sell",<br />      "amount": 6,<br />      "price": 9.26,<br />      "DateCreated": "2024-10-30T15:30:00.000Z"<br />    }<br />  ]<br />}</pre> |
| `GET /api/orders` | Returns information about the current user's stock orders. | <pre>{<br />  "Orders": [<br />    {<br />      "id": 1,<br />      "stock": "TSLA",<br />      "action": "buy",<br />      "amount": 1,<br />      "datetime": "2024-10-30T15:30:00.000Z",<br />      "repeat": 6.0484+8 //week in milliseconds<br />    }<br />  ]<br />}</pre> |
| `POST /api/orders` | Allows the user to place a stock order. | <pre>{<br />  "id": 2,<br />  "stock": "GME",<br />  "action": "buy",<br />  "amount": 2.5,<br />  "time": "2024-11-02T19:48:00.000Z",<br />  "repeat": null<br />}</pre> |
| `PUT /api/orders` | Allows the user to edit one of their stock orders. | <pre>{<br />  "id": 2,<br />  "stock": "GME",<br />  "action": "buy",<br />  "amount": 2.5,<br />  "time": "2024-11-02T19:48:00.000Z",<br />  "repeat": null<br />}</pre> |
| `DELETE /api/orders` | Allows the user to delete one of their stock orders. | <pre>{<br />  "message": "Delete Successful"<br />}</pre> |
