import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Divider, SingleStock } from "./StockListHelpers";

/**
 * ### Watchlist Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays the current user's created watchlists as dropdown menus that can show the stocks within.
 * @param user The user data passed in from the parent.
 */
export default function WatchlistModule() {

    // Grab the current user's watchlist state.
    // If the state has not yet loaded, show loading text in place of the module.
    // Once loaded, grab the necessary slice.
    // TODO loading is a failsafe, usually only lasts a millisecond; maybe find way to force state load before render
    const watchlistState = useSelector((state) => state.watchlist);
    if(!watchlistState.watchlists?.Watchlists) return <h3 style={{marginLeft: "20px"}}>Loading...</h3>
    const watchlists = watchlistState.watchlists.Watchlists;

    return (<div className="profile-stock-list" id="profile-right__watchlist">
        <div className="psl-section-head">
            <h3>Lists</h3>
            {/* This is the add button to create a new watchlist. Fill out its functionality as needed. */}
            <button className="psl-btn" id="psl-btn-add"><BsPlus /></button>
        </div>
        <Divider />
        {/* Watchlist code goes here. 
            Note: Use the SingleStock component to represent the stocks on each watchlist. */}
        {watchlists?.map((list) => <SingleWatchlist key={list.id} list={list} />)}

    </div>)
}

/**
 * ### Single Watchlist
 * The primary reason why a single watchlist has been abstracted into its own component is to allow for
 * each list to control itself whilst maintaining code readability.
 * 
 *! **Known Issue**: There is no way to prevent the appearance of a <Divider> after the last watchlist.
 * 
 * @param list List data passed in from the watchlist state.
 */
function SingleWatchlist({ list }) {
    // Create a state variable which manages the watchlist's visibility.
    // If the list ID is 1, it should be visible by default. Otherwise, should be hidden.
    const [visible, setVisible] = useState(list.id === 1);

    // Create a dynamic className for the visibility of the list.
    const watchlistClassName = "psl-btn" + (visible ? "" : " psl-list-hidden");

    return (<div className="psl-watchlist">
        <div className="psl-watchlist__head">
            <h4>{list.name}</h4>
            <button className={watchlistClassName} onClick={() => setVisible(!visible)}>
                {visible ? <FaAngleUp /> : <FaAngleDown />}
            </button>
        </div>
        <div className="psl-watchlist__body">
            {visible ? list?.watchlist_stocks.map((stock) => <SingleStock key={stock.id} stock={stock} />) : <></>}
        </div>
        <Divider />
    </div>)
}