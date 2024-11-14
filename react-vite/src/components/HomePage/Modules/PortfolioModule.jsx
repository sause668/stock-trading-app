import { useSelector } from "react-redux";
import { Divider, SingleStock } from "./StockListHelpers";

/**
 * ### Portfolio Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays a `StockList` of every stock owned by the current user.
 */
export default function PortfolioModule() {
    // Get the current user's list of owned stocks.
    const stocks = useSelector((state) => state.stock.stocks);
    
    return (<div className="profile-stock-list" id="profile-right__portfolio">
        <h3 className="psl-section-head">Portfolio</h3>
        <Divider />
        {/* Map through the owned stocks array and create a SingleStock tile for each owned stock. */}
        {stocks.length 
            ? stocks?.map((stock) => <SingleStock key={stocks.indexOf(stock)} stock={stock} />)
            : <p style={{marginLeft: "20px"}}>No owned stocks</p>
        }
        <Divider />
    </div>)
}