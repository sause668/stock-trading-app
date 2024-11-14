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
 * @param stock The stock data to pass in.
 */
export function SingleStock({ stock }) {
    const stockVal = (() => {
        if(stock.value) return stock.value
        else return stock.name;
    })();

    // const stockPrc = (() => {
    //     if(stock.value) return stock.value
    //         .split("(")[1]
    //         .split("%")[0];
    //     else return stock.name;
    // })();

    // const stockCol = stock.color ? stock.color : "initial"
    const stockArrow = (() => {
        if(!stock.value) return <></>;
        else return stock?.value[0] === "+" ? <TiArrowSortedUp /> : <TiArrowSortedDown />
    })();

    return (<div className="psl-stock">
        <div className="psl-stock__info-ctrl">
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
            </p> */}
        </div>
    </div>)
}
