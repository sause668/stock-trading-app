import { BsPlus } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import "./StockList.css";

/** Divider Helper Component - because it looks cleaner to me. */
const Divider = () => <div className="psl-divider" />

/**
 * ### Portfolio Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays a `StockList` of every stock & cryptocurrency owned by the current user.
 * @param user Passes in current user data to make the appropriate API calls.
 */
export function PortfolioModule({ user }) {
    return (<div className="profile-stock-list" id="profile-right__portfolio">
        <h3 className="psl-section-head">Cryptocurrencies</h3>
        <Divider />
        {/* Insert: List of currently held cryptocurrencies */}
        <p></p>
        <Divider />
        <h3 className="psl-section-head">Stocks</h3>
        <Divider />
        {/* Insert: List of currently held stocks */}
        <p></p>
        <Divider />
    </div>)
}

/**
 * ### Watchlist Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays the current user's created watchlists.
 * @param user Passes in current user data to make the appropriate API calls.
 */
export function WatchlistModule() {
    return (<div className="profile-stock-list" id="profile-right__watchlist">
        <div className="psl-section-head" style={{display: "flex", justifyContent: "space-between"}}>
            <h3>Lists</h3>
            <button className="psl-btn" id="psl-btn-add"><BsPlus /></button>
        </div>
        <Divider />
        {/* Insert: For loop iterating through all existing watchlists */}
        <Watchlist />
    </div>)
}

function Watchlist() {
    return (<>
        <div className="psl-section-head" style={{display: "flex", justifyContent: "space-between"}}>
            <h4>My First List</h4>
            <button className="psl-btn" id="psl-btn-dropdown"><FaChevronUp /></button>
        </div>
        <SingleStock stock={PLACEHOLDER_STOCK} />
        <Divider />
    </>)
}

// Still haven't read up on the API yet, so this set of placeholder data is just the basics
// and will obviously be modified later alongside everything else.
const PLACEHOLDER_STOCK = {
    "symb": "AAPL",
    "val": 226.96,
    "prc": -1.00
}

function SingleStock({ stock }) {
    return (<div className="psl-stock">
        <h5>{stock.symb}</h5>
        <div className="psl-stock__trend">
            <p className="psl-stock__val">${stock.val}</p>
            <p className="psl-stock__prc">{stock.prc.toString()}%</p>
        </div>
    </div>)
}