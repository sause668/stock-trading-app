import { useState } from "react";
import { useDispatch } from "react-redux";
import { buyStock, updateStock, getUserStocks } from "../../redux/stock";


const BuyStock = (props) => {
    //get current stock and user owned stocks from props
    const {stock, ownedStock} = props
    const dispatch = useDispatch()
    
    const [amt, setAmt] = useState('');
    const updateAmt = e => setAmt(e.target.value);
    //on submit if stock owned update amount, if not owned add to user stocks
    const handleSubmit = e => {
        e.preventDefault();
        if (ownedStock) {
            dispatch(updateStock(stock, amt, 'buy'))
        } else {
            dispatch(buyStock(stock, amt))
        }
        dispatch(getUserStocks())
        setAmt('')
    }

  return (
    <div className="buy-stock">
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="purchase">Purchase </label>
            <input
            name='purchase'
            type="number"
            min='0.1'
            max='10.0'
            step='0.1'
            value={amt}
            onChange={updateAmt} /> 
            {' '}shares <button type="submit">Buy</button>
        </form>
    </div>
  )
};

export default BuyStock;
