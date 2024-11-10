/** The below "components" are helpers for code that would otherwise have been repeated a lot in the Stock List
    on the right side of the profile page. Not to be included in the re-exporter for HomePage. */

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
    return (<div className="psl-stock">
        <h5>{stock.symb}</h5>
        <div className="psl-stock__trend">
            <p className="psl-stock__val">${stock.val}</p>
            <p className="psl-stock__prc">{stock.prc.toString()}%</p>
        </div>
    </div>)
}