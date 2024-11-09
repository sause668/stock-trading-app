import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyStock, updateStock, clearStocks } from "../../redux/stock";


const BuyStock = (props) => {
    
    const {stock, userStocks} = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [amt, setAmt] = useState('');
    const updateAmt = e => setAmt(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        if (userStocks.find(s => s.name  == stock.symbol)) {
            dispatch(updateStock(stock, amt, 'buy'))
        } else {
            dispatch(buyStock(stock, amt))
        }
        dispatch(clearStocks())
        navigate(`/`)
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
