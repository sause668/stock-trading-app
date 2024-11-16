import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PortfolioModule, TransactionModule, WatchlistModule } from "./Modules";
import Transactions from "../Transactions"; 

import { getUserStocks } from "../../redux/stock";
import { fetchWatchlists } from "../../redux/watchlist";
import "./StockList.css";

/** 
 * ### Profile Page Component
 * Displays a page containing *user information* whilst in the **logged in** state.
 */
export default function ProfilePage({ user }) {
    const dispatch = useDispatch();
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        if (user) {
            dispatch(getUserStocks());
            dispatch(fetchWatchlists());
            dispatch(getCurrentPortfolio());
        } else {
            console.error("Profile page loaded without a logged-in user!");
        }
    }, [dispatch, user]);

    const updatePortfolioBalance = async (addAmount) => {
        const res = await fetch(`/api/portfolio`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ addAmount }),
        });

        if (res.ok) {
            const updatedPortfolio = await res.json();
            setPortfolio(updatedPortfolio);
        } else {
            console.error("Failed to update portfolio balance");
        }
    };

    return (
        <main id="profile-main">
            <h1>Investing</h1>

            <section id="profile-left">
                <TransactionModule user={user} />
                <Transactions />
                <PortfolioModule updatePortfolioBalance={updatePortfolioBalance} />
            </section>

            <section id="profile-right">
                <WatchlistModule user={user} />
            </section>
        </main>
    );
}