import { useState } from "react";
import { useDispatch } from "react-redux";
import { buyStock, updateStock, getUserStocks } from "../../redux/stock";


const BuyStock = (props) => {
    //get current stock and user owned stocks from props
    const {stock, ownedStock} = props
    const dispatch = useDispatch()
    
    const [amt, setAmt] = useState(0);
    const [pAmount, setPamount] = useState(amt)
    const [value, setValue] = useState(0)
    
    const updateAmt = e => {
        setPamount(amt)
        setAmt(e.target.value)
        //displays $ value of potential sale, currently does not display correctly on first down press, not sure how to fix without using store
        if(amt == 0 && (pAmount == 0 || pAmount == 0.1)){
            setValue((0.1 * stock.afterHours).toFixed(2))
        }
        else if(amt > pAmount){
            setValue(((Number(amt) + .1) * stock.afterHours).toFixed(2))
        } else if (pAmount > amt){
            setValue(((Number(amt) - .1) * stock.afterHours).toFixed(2))
        }
    }
    //on submit if stock owned update amount, if not owned add to user stocks
    const handleSubmit = e => {
        e.preventDefault();
        if(window.confirm(`Are you sure you would like to purchase ${amt} shares of ${stock.symbol} for $${value}`)){
            if (ownedStock) {
                dispatch(updateStock(stock, amt, 'buy'))
            } else {
                dispatch(buyStock(stock, amt))
            }
            dispatch(getUserStocks())
            setAmt('')
            setValue(0)
        }
    }

  return (
    <div className="buy-stock">
            Buy {stock.symbol}
        <form onSubmit={handleSubmit}>
            <label htmlFor="purchase">Amount </label>
            <input
            name='purchase'
            type="number"
            min='0.0'
            max='10.0'
            step='0.1'
            value={amt}
            onChange={updateAmt} /> {' '}shares <button type="submit">Buy</button>
            Value ${value}
        </form>
    </div>
  )
};

export default BuyStock;
