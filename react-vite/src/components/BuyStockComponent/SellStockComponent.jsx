import { useState } from "react";
import { useDispatch } from "react-redux";
import { sellStock, updateStock, getUserStocks } from "../../redux/stock";


const SellStock = (props) => {
    //get stock and user owned stocks from props
    const {stock, ownedStock} = props
    const dispatch = useDispatch()
    
    const [amt, setAmt] = useState('');
    const updateAmt = e => setAmt(e.target.value);
    //on form submit sell amount of shares of stock selected
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateStock(stock, amt, 'sell'))
        dispatch(getUserStocks())
        setAmt('')
    }
    //on click sell all shares of selected stock
    const handleClick = () => {
        dispatch(sellStock(stock.symbol))
        dispatch(getUserStocks())
        setAmt('')
    }

  return (
    <div className="buy-stock">
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="purchase">Sell </label>
            <input
            name='purchase'
            type="number"
            min='0.1'
            max={ownedStock.amount}
            step='0.1'
            value={amt}
            onChange={updateAmt} /> 
            {' '}shares <button type="submit">Sell</button>
        </form>
        <button onClick={handleClick}>Sell All Shares</button>
    </div>
  )
};

export default SellStock;
