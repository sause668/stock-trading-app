import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserStocks, getStock } from "../../redux/stock";
import StockChart from "./StockChart";
import {BuyStock, SellStock} from "./BuyStockComponent"
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { convert, unavailable } from "./stockPageUtils";
import { fetchWatchlists } from "../../redux/watchlist";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddtoWatchlistModal from "./AddtoWatchlistModal";
import "./StockPage.css"


Chart.register(CategoryScale);

const StockPage = () => {
    const {symb} = useParams()
    const stock = useSelector(state => state.stock.stock)
    const userStocks = useSelector(state => state.stock.stocks)
    const user = useSelector(state => state.session.user)
    const info = stock?.ticker.results
    const stockOwned = userStocks.find(s => s.name == stock?.symbol)
    const watchlists = useSelector(state => state.watchlist.watchlists)
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    console.log(stockOwned)
    //load stock and user stocks
    useEffect(() => {
        dispatch(getStock(symb)).then(() => setIsLoaded(true))
        if (user) {
          dispatch(getUserStocks())
          dispatch(fetchWatchlists())
        } 
    }, [dispatch, symb, user])

    if(!isLoaded){
      return (
        <h2>Retrieving stock info...</h2>
      )
    }

    if (isLoaded && stock.status == 'OK') {
    // formula to show stock perfomance
    let color
    let op
    if (stock.chartData[29]-stock.chartData[0] > 0) {
         color = 'green'
         op = '+' 
    } else {
         color = 'red'
         op = '-'
    }

    return (
        <main id='stock-page'>
          <div id='title'>
            <div id='price'>
            <h2>${stock.afterHours} {stock.symbol}</h2>                                   
            {stock.chartData && 
            <p className={color}>{op}${(Math.abs(stock.chartData[29]-stock.chartData[0])).toFixed(2)} {'(' + ((stock.chartData[29] - stock.chartData[0]) / stock.chartData[29] * 100).toFixed(2) + '%)'} {op == '+'? <FaCaretUp />:<FaCaretDown />}</p>}
            </div>   
            <h1> {info.name}
            {info.branding?.icon_url && <img className="stock-company-icon" src={`${info.branding.icon_url}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl`}
            title='Company Icon'/>} </h1> 
          </div> 
            {/* display stock chart using data pulled from back end and stored in redux store */}
            <div id="stockChart">
            <StockChart chartData={stock.chart}/>
            </div>
          
            {/* if user logged in option to buy stock and add stock to watchlist available */}
            {user &&
              <div className="buy-sell">
               <BuyStock stock={stock} ownedStock={stockOwned} />
               {/* if stock owned by user option to sell stock available */}
               {stockOwned &&
               <SellStock stock={stock} ownedStock={stockOwned} /> 
               }
               {watchlists && 
               <OpenModalButton
                buttonText="Add to a Watchlist"
                modalComponent={<AddtoWatchlistModal stock={stock} watchlists={watchlists}
                className='btn'/>}
              />}
              </div>
            }
            <section id="about">  
              <h2>About</h2>
              <div id='about-heading'>{info.branding?.logo_url && 
                <img className="stock-company-icon" src={`${info.branding.logo_url}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl`} title='Company Logo'/>}      
                <h3>Industry: {info.sic_description? info.sic_description:unavailable}</h3>
              </div>
              <p>{info.description? info.description:'Company description not available'}</p>
              <div className="key-stats"> 
                <p><span>Headquarters</span> {info.address? [info.address.city +', '+ info.address.state]:unavailable}</p>
                <p><span>Employees</span> {convert(info.total_employees)}</p>
                <p><span>First Listed</span> {info.list_date? info.list_date:unavailable}</p>
                <p><span>Website</span> {info.homepage_url? <Link to={info.homepage_url} target="_blank"> {info.homepage_url}</Link>:unavailable}</p>
              </div>
          </section>
          <h2>Key Statistics</h2>
          <section className="key-stats">  
            <p><span>Previous High</span> ${stock.high}</p>
            <p><span>Previous Low</span> ${stock.low}</p>
            <p><span>Previous Open</span> ${stock.open}</p>
            <p><span>Previous Close</span> ${stock.close}</p>
            <p><span>Last Week High</span> ${Math.max(...stock.chartData)}</p>
            <p><span>Last Week Low</span> ${Math.min(...stock.chartData)}</p>
            <p><span>Volume</span> {convert(stock.volume)}</p>
            <p><span>Market Cap</span> {convert(info.market_cap)}</p>
          </section>
          <h2>Related Companies</h2>
          <section id="related">
              { stock.related.results? 
                stock.related.results.map((r, i) => {
                return (
                <li key={i}>
                <h3>{r.ticker}</h3>
                <Link to={`/stocks/${r.ticker}`}>{r.ticker}</Link></li>)
              }) : <li>{unavailable}</li>
              }
          </section> 
        </main>
    )}
    else return (<h2>Stock not found. Please try your search again.</h2>)
};

export default StockPage;
