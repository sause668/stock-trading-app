import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserStocks, getStock } from "../../redux/stock";
import StockChart from "./StockChart";
import BuyStock from "../BuyStockComponent";
import SellStock from "../BuyStockComponent/SellStockComponent";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import "./StockComponent.css"

const StockPage = () => {
    const {symb} = useParams()
    const stock = useSelector(state => state.stock.stock)
    const userStocks = useSelector(state => state.stock.stocks)
    const user = useSelector(state => state.session.user)
    const info = stock?.ticker.results
    const dispatch = useDispatch();
    const stockOwned = userStocks.find(s => s.name == stock?.symbol)
    
    //load stock and user stocks
    useEffect(() => {
        dispatch(getStock(symb))
        if(user) dispatch(getUserStocks())
    }, [dispatch, symb, user])

    let sign
    let op
    if (stock?.close-stock?.open > 0) {
         sign = 'plus'
         op = '+' 
    } else {
         sign = 'minus'
         op = '-'
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
            <p className={sign}>{op}${(Math.abs(stock.close-stock.open)).toPrecision(2)} {'(' + (stock.open/stock.close).toPrecision(2) + '%)'} {op == '+'? <FaCaretUp />:<FaCaretDown />}</p>
            
            <StockChart stock={stock}/>
            <div className="buy_sell">
            {user &&
              <>
               <BuyStock stock={stock} ownedStock={stockOwned}/>
               {stockOwned &&
               <SellStock stock={stock} ownedStock={stockOwned}/> 
               }
              </>
            }
            </div> 
            <h2>About</h2>
            <img src={`${info.branding?.logo_url}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl`}
            title='Company Logo' />      
            <h3>{info.sic_description}</h3>
            <p>{info.description? info.description:'No company description in database'}</p>
            <p>Location: {info.address?.city}, {info.address?.state}</p>
            <p>First Listed: {info.list_date? info.list_date:"unlisted"}</p>
            <p>Website: <Link to={info.homepage_url}>{info.homepage_url}</Link></p>
            <h2>Key Statistics</h2>
            <p>Market Cap: {info.market_cap}</p>
            <p>High today: ${stock.high}</p>
            <p>Low today: ${stock.low}</p>
            <p>Open price: ${stock.open}</p>
            <p>Volume: {stock.volume}</p>
            <h2>Related Companies</h2>
            <section className="related">
            {stock.related.results.map(r => {
              return (
              <li key={r.ticker}>
                <h3>{r.ticker}</h3>
                <Link to={`/stocks/${r.ticker}`}>{r.ticker}</Link></li>)
            })
            }
            </section> 
        </>
    )}
    else return (<p>Stock not found. If entered correctly please try again in 1 minute.</p>)
};

export default StockPage;
