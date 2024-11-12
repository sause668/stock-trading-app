import { Divider, SingleStock } from "./StockListHelpers";

/**
 * ### Portfolio Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays a `StockList` of every stock owned by the current user.
 */
export default function PortfolioModule() {
    return (<div className="profile-stock-list" id="profile-right__portfolio">
        <h3 className="psl-section-head">Portfolio</h3>
        <Divider />
        {/* Insert: List of currently held stocks */}
        <p></p>
        <Divider />
    </div>)
}