import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPortfolio, editPortfolio } from "../../../redux/portfolio";
import SingleStock from "./SingleStock";

/**
 * ### Portfolio Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays a list of owned stocks and provides the ability to add funds to the user's
 * portfolio balance.
 */
export default function PortfolioModule() {
    const dispatch = useDispatch();
    const formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });
    const portfolio = useSelector((state) => state.portfolio);
    const stocks = useSelector((state) => state.stock.stocks);
    const [addAmount, setAddAmount] = useState("");
    const [balance, setBalance] = useState("Loading...");

    // Submission event to add funds to the portfolio.
    const handleAddFunds = (e) => {
        e.preventDefault();
        if (addAmount) {
            // Add the desired amount to the portfolio balance.
            // The follow-up GET dispatch is a failsafe. May be removed later.
            dispatch(editPortfolio({ "addAmount": parseFloat(addAmount) }))
            .then(() => dispatch(getCurrentPortfolio()));

            // Clear the input field and refresh the balance.
            setAddAmount(""); 
            refreshBalance();
        }
    }

    // Refreshes the balance number displayed on the page.
    // This allows for USD currency styling to be applied via the formatter.
    const refreshBalance = () => {
        if(!portfolio.balance)
            return console.warn("PortfolioModule: Balance refresh failed, state null");
        setBalance(formatter.format(portfolio.balance));
    }

    // On page load, refresh the balance.
    useEffect(() => { refreshBalance(); })

    return (<div id="profile-left__portfolio" className="profile-module">
        {/* Module Title */}
        <h2 className="profile-module__title">Portfolio</h2>

        {/* Module Body Left */}
        <div id="profile-portfolio-left">
            {/* Current Balance */}
            <p>{balance}</p>

            {/* Add Funds Form */}
            <form id="profile-portfolio-form" onSubmit={handleAddFunds}>
                <input
                    type="number"
                    id="profile-portfolio"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="Add funds..."
                    step="0.01"
                />
                <button type="submit">Add Funds</button>
            </form>
        </div>

        {/* Module Body Right - Stock List */}
        <div id="profile-portfolio-right">
            {stocks.length 
                ? stocks.map((stock) => <SingleStock key={stocks.indexOf(stock)} mode="portfolio" stock={stock} />)
                : (<>
                    <h3>Loading...</h3>
                    <p>If loading persists, you may not own a stock yet. Buy a stock and it&apos;s information will show up here!</p>
                </>)
            }
        </div>
    </div>);
}