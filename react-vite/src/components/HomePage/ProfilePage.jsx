import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrderModule, PortfolioModule, TransactionModule, WatchlistModule } from "./Modules";
import Transactions from "../Transactions"; 

import { getUserStocks } from "../../redux/stock";
import { fetchWatchlists } from "../../redux/watchlist";
import "./StockList.css";

/** 
 * ### Profile Page Component
 * Displays a page containing *user information* whilst in the **logged in** state.
 * 
 * Also largely an abstraction layer; consists mostly of four modules and orders them appropriately on the page itself.
 * The page is split into two halves. The left half manages the user's Orders and Transactions. The right half manages
 * the user's Portfolio (owned stock list) and existing Watchlists.
 * @param user Carries session user data. Ultimately passed to all submodules for later use.
 */
export default function ProfilePage({ user }) {
    const dispatch = useDispatch();

    // If a user exists, get the user's stock state data.
    // The page assumes a user is logged in, but this check will remain in place as an error handler.
    useEffect(() => {
        if(user) {
            dispatch(getUserStocks());
            dispatch(fetchWatchlists());
        } else console.error("Something went wrong: The Profile page was somehow loaded when a user was not logged in!");
    });

    return (
        <main id="profile-main">
            {/* Page Title */}
            <h1>Investing</h1>

            {/* The left side of the profile page holds the user's orders and previous transactions. */}
            <section id="profile-left">
                <OrderModule user={user} />
                <TransactionModule user={user} />
                {/* Added Transactions component */}
                <Transactions />
            </section>

            {/* The right side of the profile page holds the user's portfolio at the top, and watchlists at the bottom. */}
            <section id="profile-right">
                <PortfolioModule />
                <WatchlistModule user={user} />
            </section>
        </main>
    );
}
