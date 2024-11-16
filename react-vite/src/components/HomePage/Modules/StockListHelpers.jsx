/** The below "components" are helpers for code that would otherwise have been repeated a lot in the Stock List
    on the right side of the profile page. Not to be included in the re-exporter for HomePage. */
import { MdDeleteForever } from "react-icons/md";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

/** 
 * ### Divider Helper Component 
 * Acts as a line divider for the parent list. Cleans up a repeated line in the module itself. 
 */
export const Divider = () => <div className="psl-divider" />

/**
 * ### Single Stock Helper Component
 * This component takes stock data and creates a pre-filled stock cell that nicely fits onto the list.
 * 
 * @param {object} stock The stock data to pass in.
 * @returns 
 */
export function SingleStock({ mode, stock }) {
    // Set the stock's class based on its mode.
    const className = mode === "portfolio" 
        ? "profile-portfolio-stock"
        : "profile-watchlist-stock";

    // Determine the stock value's text color based on whether the value has increased or decreased.
    stock.color = (() => {
        const diff = stock.newValue - stock.value;
        if(diff > 0) return "lawngreen";
        else if(diff < 0) return "red";
        else return "yellow"; // TODO probably just white instead
    })();

    stock.arrow = (() => {
        switch(stock.color) {
            case "lawngreen":
                return <TiArrowSortedUp />;
            case "yellow":
                return <sup style={{marginRight: "2px"}}>~</sup>;
            case "red":
                return <TiArrowSortedDown />;
        }
    })();

    return (<div className={className}>
        <p>
            {stock.name}:
            <span className="profile-stock__val" style={{color: stock.color}}>{stock.arrow}${stock.value}</span>
            {stock.amount}<span className="profile-stock__amt"> shares</span>
        </p>
    </div>)
}

/**
 *         <div className="psl-stock__info-ctrl">
            <h5>{stock.name}</h5>
            {stock.color
                ? <button className="psl-btn"><MdDeleteForever /></button> 
                : <></>
            }
        </div>
        <div className="psl-stock__trend">
            <p className="psl-stock__val">${stockVal}</p>
            {/* <p className="psl-stock__prc" style={{color: stockCol}}>
                {stockArrow}
                {stockPrc}%
            </p> }
            </div>
 */