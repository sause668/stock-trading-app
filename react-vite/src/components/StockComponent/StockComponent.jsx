import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { buyStock } from "../../redux/stock";
import "./StockComponent.css"

const StockPage = () => {
  const stock = useSelector(state => state.stock.stock)
  const user = useSelector(state => state.session.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const info = stock?.ticker.results

  const [amt, setAmt] = useState('');
  const updateAmt = e => setAmt(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(buyStock(stock, amt))
        navigate(`/`)
    }
    
  if (stock && stock.status == 'OK' && stock.ticker.status == 'OK') {
    return (
        <>
          <div id='title'>  
            <h1> {info.name} </h1>
            <img src={`${info.branding?.icon_url}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl`}
            title='Company Icon'/>   
          </div>
            <h2>${stock.close} {stock.symbol}</h2>
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
                    {' '}shares <button type="submit">Buy</button>
                 </form>
            } 
            <h1>About</h1>
            <img src={`${info.branding?.logo_url}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl`}
            title='Company Logo' />      
            <h3>{info.sic_description}</h3>
            <p>{info.description? info.description:'No company description in database'}</p>
            <p>Location: {info.address?.city}, {info.address?.state}</p>
            <p>First Listed: {info.list_date? info.list_date:"unlisted"}</p>
            <p>Website: <Link to={info.homepage_url}>{info.homepage_url}</Link></p>
            
        </>
    )}
    else return (<p>Stock not found. If entered correctly please try again in 1 minute.</p>)
};

export default StockPage;
