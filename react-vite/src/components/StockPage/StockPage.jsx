import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserStocks, getStock } from "../../redux/stock";
import StockChart from "../StockChart";
import BuyStock from "../BuyStockComponent";
import SellStock from "../BuyStockComponent/SellStockComponent";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { convert, unavailable } from "./stockPageUtils";
import "./StockPage.css"


Chart.register(CategoryScale);

const StockPage = () => {
    const {symb} = useParams()
    const stock = useSelector(state => state.stock.stock)
    const userStocks = useSelector(state => state.stock.stocks)
    const user = useSelector(state => state.session.user)
    const info = stock?.ticker.results
    const dispatch = useDispatch();
    const stockOwned = userStocks.find(s => s.name == stock?.symbol)
    const [isLoaded, setIsLoaded] = useState(false);
    const [aVisibility, setAVisibility] = useState('visible')
    const [bVisibility, setBVisibility] = useState('invisible')

    //load stock and user stocks
    useEffect(() => {
        dispatch(getStock(symb)).then(() => setIsLoaded(true))
        if (user) {
          dispatch(getUserStocks())
        } 
    }, [dispatch, symb, user])

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
        <body id='stock-page'>
          <div id='title'>  
            <h1> {info.name} </h1>
            {info.branding?.icon_url && <img className="stock-company-icon" src={`${info.branding.icon_url}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl`}
            title='Company Icon'/>}   
          </div>
          <div id="stockChart">
            <h2>${stock.afterHours} {stock.symbol}</h2>                                          
            {stock.chartData && 
            <p className={color}>{op}${(Math.abs(stock.chartData[29]-stock.chartData[0])).toFixed(2)} {'(' + ((stock.chartData[29] - stock.chartData[0]) / stock.chartData[29] * 100).toFixed(2) + '%)'} {op == '+'? <FaCaretUp />:<FaCaretDown />}</p>}
            {/* display stock chart using data pulled from back in and stored in redux store */}
            <StockChart chartData={stock.chart}/>
            </div>
          <div className="buy-sell">
            {/* if user logged in option to buy stock available */}
            {user &&
              <>
               <BuyStock stock={stock} ownedStock={stockOwned} className={aVisibility}/>
               {/* if stock owned by user option to sell stock available */}
               {stockOwned &&
               <SellStock stock={stock} ownedStock={stockOwned} className={bVisibility}/> 
               }
              </>
            }
            <button className='btn'>Add to a watchlist</button>
          </div>
            <section id="about">  
              <h2>About</h2>
              <h3>{info.branding?.logo_url && 
              <img className="stock-company-icon" src={`${info.branding.logo_url}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl`}
              title='Company Logo' />}      
              Industry: {info.sic_description? info.sic_description:unavailable}</h3>
              <p>{info.description? info.description:unavailable}</p>
            
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
              {stock.related.results?.map((r, i) => {
                return (
                <li key={i}>
                <h3>{r.ticker}</h3>
                <Link to={`/stocks/${r.ticker}`}>{r.ticker}</Link></li>)
              })
              }
          </section> 
        </body>
    )}
    else return (<p>Stock not found. Please try your search again.</p>)
};

export default StockPage;
