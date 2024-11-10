import { Divider, SingleStock } from "./StockListHelpers";

/**
 * ### Portfolio Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays a `StockList` of every stock & cryptocurrency owned by the current user.
 * @param user The user data passed in from the parent.
 */
export default function PortfolioModule({ user }) {
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