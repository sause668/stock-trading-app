import { BsPlus } from "react-icons/bs";
import { Divider, SingleStock } from "./StockListHelpers";

/**
 * ### Watchlist Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays the current user's created watchlists as dropdown menus that can show the stocks within.
 * @param user The user data passed in from the parent.
 */
export default function WatchlistModule() {
    return (<div className="profile-stock-list" id="profile-right__watchlist">
        <div className="psl-section-head" style={{display: "flex", justifyContent: "space-between"}}>
            <h3>Lists</h3>
            {/* This is the add button to create a new watchlist. Fill out its functionality as needed. */}
            <button className="psl-btn" id="psl-btn-add"><BsPlus /></button>
        </div>
        <Divider />
        {/* Watchlist code goes here. 
            Note: Use the SingleStock component to represent the stocks on each watchlist. */}


    </div>)
}