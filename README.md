# Flask React Project

This is the starter for the Flask React project.

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the __dist__ folder located in
the root of your __react-vite__ folder when you push to GitHub. This __dist__
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your __react-vite__ folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the __Dockerfile__, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a __.env__ file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
__.env__ file. As you work to further develop your project, you may need to add
more environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

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
