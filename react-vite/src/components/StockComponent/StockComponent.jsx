import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buyStock } from "../../redux/stock";

const StockPage = () => {
  const stock = useSelector(state => state.stock.stock)
  const user = useSelector(state => state.session.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [amt, setAmt] = useState('');
  const updateAmt = (e) => setAmt(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(buyStock(stock, amt))
        navigate(`/`)
    }

  if (stock && stock.status == 'OK') {
    return (
        <>
            <h1>
                {stock.symbol}
            </h1>
            <p>Pre-Market: {stock.preMarket}</p>
            <p>Open: {stock.open}</p>
            <p>High: {stock.high}</p>
            <p>Low: {stock.low}</p>
            <p>Close: {stock.close}</p>
            <p>After-Hours: {stock.afterHours}</p>
            <p>Volume: {stock.volume}</p>
            {user &&
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
                    shares <button type="submit">Buy</button>
                </form>
            }
        </>
    )}
    else return (<p>Stock Not Found</p>)
};

export default StockPage;
