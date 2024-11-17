import { useState } from "react";
import { useDispatch } from "react-redux";
import { buyStock, updateStock, getUserStocks } from "../../../redux/stock";


const BuyStock = (props) => {
    //get current stock and user owned stocks from props
    const {stock, ownedStock} = props
    const dispatch = useDispatch()
    
    const [amt, setAmt] = useState('');
    const [pAmount, setPAmount] = useState(0)
    const [value, setValue] = useState(0)
    
    const updateAmt = e => {
        setAmt(e.target.value)
        setPAmount(amt)
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
    <div className="buy-stock" >
            <h3>Buy {stock.symbol}</h3>
        <form onSubmit={handleSubmit} >
            <input
            id="purchase"
            placeholder="shares to purchase"
            name='purchase'
            type="number"
            min='0.0'
            max='10.0'
            step='0.1'
            value={amt}
            onChange={updateAmt} />
            <button type="submit" className="btn">Buy</button>
            <h3>Value ${value}</h3>
        </form>
    </div>
  )
};

export default BuyStock;
