import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PortfolioModule, TransactionModule, WatchlistModule } from "./Modules";
import Transactions from "../Transactions"; 

import { getUserStocks } from "../../redux/stock";
import { getCurrentPortfolio } from "../../redux/portfolio";
import { fetchWatchlists } from "../../redux/watchlist";
import "./StockList.css";

/** 
 * ### Profile Page Component
 * Displays a page containing *user information* whilst in the **logged in** state.
 */
export default function ProfilePage({ user }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getUserStocks());
            dispatch(fetchWatchlists());
            dispatch(getCurrentPortfolio());
        } else {
            console.error("Profile page loaded without a logged-in user!");
        }
    }, [dispatch, user]);

    return (
        <main id="profile-main">
            <h1>Investing</h1>

            <section id="profile-left">
                <TransactionModule user={user} />
                <Transactions />
                <PortfolioModule />
            </section>

            <section id="profile-right">
                <WatchlistModule user={user} />
            </section>
        </main>
    );
}