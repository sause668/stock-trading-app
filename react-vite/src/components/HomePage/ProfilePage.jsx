import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PortfolioModule, TransactionModule, WatchlistModule } from "./Modules";
import { getUserStocks } from "../../redux/stock";
import { getCurrentPortfolio } from "../../redux/portfolio";
import { getTransactionsThunk } from "../../redux/transactionThunks";
import { fetchWatchlists } from "../../redux/watchlist";
import "./Modules/Modules.css";

/** 
 * ### Profile Page Component
 * Displays a page containing *user information* whilst in the **logged in** state.
 * 
 * The Profile Page is comprised of three modules split into two sides of the page. 
 * Two modules make up the left side of the page, and the third occupies the right 
 * side. The end goal is for this page to be the all-in-one information center that
 * keeps the user up-to-date on all of their activity within the service.
 */
export default function ProfilePage({ user }) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (user) {
            dispatch(fetchWatchlists());
            dispatch(getCurrentPortfolio());
            dispatch(getTransactionsThunk());
            dispatch(getUserStocks());
        } else {
            console.error("Profile page loaded without a logged-in user!");
        }
    }, [dispatch, user]);

    return (
        <main id="profile-main">
            <h1>Investing</h1>

            <section id="profile-left">
                <PortfolioModule />
                <TransactionModule />
            </section>

            <section id="profile-right">
                <WatchlistModule user={user} />
            </section>
        </main>
    );
}