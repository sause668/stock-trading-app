import { useState } from "react";
import { useDispatch } from "react-redux";
import { buyStock, updateStock, getUserStocks } from "../../redux/stock";


const BuyStock = (props) => {
    //get current stock and user owned stocks from props
    const {stock, ownedStock} = props
    const dispatch = useDispatch()
    
    const [amt, setAmt] = useState('');
    const [pAmount, setPamount] = useState(amt)
    const [value, setValue] = useState(0)
    
    const updateAmt = e => {
        setAmt(e.target.value)
        if(amt == 0.1 && pAmount == 0){
            setValue(0)
        }
        else if(amt == 0){
            setValue(0.1 * stock.afterHours)
        }
        else {
            setValue((Number(pAmount) + 0.1) * stock.afterHours)
        }
        setPamount(amt)
        console.log(amt, pAmount, value)
    }
    //on submit if stock owned update amount, if not owned add to user stocks
    const handleSubmit = e => {
        e.preventDefault();
        if(window.confirm(`Are you sure you would like to purchase ${amt} shares of stock for $${value}`)){
            if (ownedStock) {
                dispatch(updateStock(stock, amt, 'buy'))
            } else {
                dispatch(buyStock(stock, amt))
            }
            dispatch(getUserStocks())
            setAmt('')
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
