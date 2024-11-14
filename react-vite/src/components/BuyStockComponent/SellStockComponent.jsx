import { useState } from "react";
import { useDispatch } from "react-redux";
import { sellStock, updateStock, getUserStocks } from "../../redux/stock";


const SellStock = (props) => {
    //get stock and user owned stocks from props
    const {stock, ownedStock} = props
    const dispatch = useDispatch()
    const color = ownedStock.price > stock.afterHours? 'red': 'green'
    const [amt, setAmt] = useState('');
    const updateAmt = e => setAmt(e.target.value);
    
    //on form submit sell amount of shares of stock selected
    const handleSubmit = async e => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to sell ${amt} shares of this stock`)){
            const sold = await dispatch(updateStock(stock, amt, 'sell'))
            alert(sold.message)
            dispatch(getUserStocks())
            setAmt('')
        }
    }
    //on click sell all shares of selected stock
    const handleClick = async () => {
        if (window.confirm('Are you sure you would like to sell all owned shares of this stock?')){
            const sold = await dispatch(sellStock(stock.symbol))
            alert(sold.message)
            dispatch(getUserStocks())
            setAmt('')
        }
    }

  return (
    <div className={`sell-stock buy-stock ${color}`}>
        <h3>Sell {stock.symbol}</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="purchase"></label>
            <input
            placeholder="shares to sell"
            name='purchase'
            type="number"
            min='0.1'
            max={ownedStock.amount}
            step='0.1'
            value={amt}
            onChange={updateAmt} /> 
            <button type="submit" className="color btn">Sell</button>
            <button onClick={handleClick} className="color btn">Sell All Shares</button>
        </form>
        
    </div>
  )
};

export default SellStock;
