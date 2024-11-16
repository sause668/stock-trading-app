import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPortfolio, editPortfolio } from "../../../redux/portfolio";
import { Divider, SingleStock } from "./StockListHelpers";

/**
 * ### Portfolio Module
 * Intended only for use within the `ProfilePage` component.
 * 
 * Displays a list of owned stocks and provides the ability to update portfolio balance.
 */
export default function PortfolioModule() {
    const dispatch = useDispatch();
    const portfolio = useSelector((state) => state.portfolio);
    const stocks = useSelector((state) => state.stock.stocks);
    const [addAmount, setAddAmount] = useState("");

    const handleAddFunds = async (e) => {
        e.preventDefault();
        if (addAmount) {
            dispatch(editPortfolio({"addAmount": parseFloat(addAmount)}))
            .then(() => dispatch(getCurrentPortfolio()));
            setAddAmount(""); // Clear input after submission
        }
    };

    return (
        <div className="profile-stock-list" id="profile-right__portfolio">
            <h3 className="psl-section-head">Portfolio</h3>
            <p>Current Balance: ${portfolio?.balance?.toFixed(2) || "0.00"}</p>
            <form onSubmit={handleAddFunds} className="add-funds-form">
                <input
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="Add funds"
                    step="0.01"
                />
                <button type="submit">Add Funds</button>
            </form>
            <Divider />
            {stocks.length 
                ? stocks.map((stock) => <SingleStock key={stocks.indexOf(stock)} stock={stock} />)
                : <p style={{marginLeft: "20px"}}>No owned stocks</p>
            }
            <Divider />
        </div>
    );
}

// import { useSelector } from "react-redux";
// import { Divider, SingleStock } from "./StockListHelpers";

// /**
//  * ### Portfolio Module
//  * Intended only for use within the `ProfilePage` component.
//  * 
//  * Displays a `StockList` of every stock owned by the current user.
//  */
// export default function PortfolioModule() {
//     // Get the current user's list of owned stocks.
//     const stocks = useSelector((state) => state.stock.stocks);
    
//     return (<div className="profile-stock-list" id="profile-right__portfolio">
//         <h3 className="psl-section-head">Portfolio</h3>
//         <Divider />
//         {/* Map through the owned stocks array and create a SingleStock tile for each owned stock. */}
//         {stocks.length 
//             ? stocks?.map((stock) => <SingleStock key={stocks.indexOf(stock)} stock={stock} />)
//             : <p style={{marginLeft: "20px"}}>No owned stocks</p>
//         }
//         <Divider />
//     </div>)
// }