import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserStocks, getStock } from "../../redux/stock";
import StockChart from "./StockChart";
import BuyStock from "../BuyStockComponent";
import SellStock from "../BuyStockComponent/SellStockComponent";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "./StockPage.css"


Chart.register(CategoryScale);

const convert = num => {
  if (isNaN(num)){
    return unavalible
  }
  num = parseInt(num).toString().split('')

  if (num.length < 4){
    return num.join('')
  }
  else if(num.length >= 4 && num.length < 7){
    if (num.length == 4){
      num.splice(1, 0, ',')
    }
    else if (num.length == 5){
      num.splice(2, 0, ',')
    }
    else if (num.length == 6){
      num.splice(3, 0, ',')
    }
    return num.join('')
  }
  else if(num.length >= 7 && num.length < 10){
    if (num.length == 7){
      num.splice(1, 0, '.')
      num.splice(4)
    }
    else if (num.length == 8){
      num.splice(2, 0, '.')
      num.splice(5)
    }
    else if (num.length == 9){
      num.splice(3, 0, '.')
      num.splice(6)
    }
    return num.join('') + 'M'
  } else if(num.length >= 10 && num.length < 13){
    if (num.length == 10){
      num.splice(1, 0, '.')
      num.splice(4)
    }
    else if (num.length == 11){
      num.splice(2, 0, '.')
      num.splice(5)
    }
    else if (num.length == 12){
      num.splice(3, 0, '.')
      num.splice(6)
    }
    return num.join('') + 'B'
  } else if(num.length >= 13){
    num.splice(num.length - 10)
    if (num.length > 2){
      num.splice(1, 0, '.')
    }
    else if (num.length > 3){
      num.splice(2, 0, '.')
    }
    return num.join('') + 'T'
  }
  else return num.join('')
}

const unavalible = "Information not available"

const StockPage = () => {
    const {symb} = useParams()
    const stock = useSelector(state => state.stock.stock)
    const userStocks = useSelector(state => state.stock.stocks)
    const user = useSelector(state => state.session.user)
    const info = stock?.ticker.results
    const dispatch = useDispatch();
    const stockOwned = userStocks.find(s => s.name == stock?.symbol)
    const [isLoaded, setIsLoaded] = useState(false);

    //load stock and user stocks
    useEffect(() => {
        dispatch(getStock(symb)).then(() => setIsLoaded(true))
        if(user) dispatch(getUserStocks())
    }, [dispatch, symb, user])

    const [preMarket, setPreMarket] = useState(stock?.preMarket)
    const [open, setOpen] = useState(stock?.open)
    const [high, setHigh] = useState(stock?.high)
    const [low, setPLow] = useState(stock?.low)
    const [close, setClose] = useState(stock?.close)
    const [afterHours, setAfterHours] = useState(stock?.afterHours)

    // formula to show stock perfomance
    let color
    let op
    if (stock?.close-stock?.open > 0) {
         color = 'green'
         op = '+' 
    } else {
         color = 'red'
         op = '-'
    }
        
    const [chartData, setChartData] = useState({
      labels: ['pre', 'open', 'high', 'low', 'close', 'after'], 
      datasets: [
        {
          label: "Daily Perfomance",
          data: [preMarket, open, high, low, close, afterHours],
          backgroundColor: ["black"],
          borderColor: color,
          borderWidth: 2,
        }
      ]
    });
      
  if (isLoaded && stock.status == 'OK' && stock.ticker.status == 'OK') {
    return (
        <>
          <div id='title'>  
            <h1> {info.name} </h1>
            {info.branding?.icon_url && <img className="stock-company-icon" src={`${info.branding.icon_url}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl`}
            title='Company Icon'/>}   
          </div>
          <div id="stockChart">
            <h2>${stock.close} {stock.symbol}</h2>                                          {/* formula to calculate percent change */}
            <p className={color}>{op}${(Math.abs(stock.close-stock.open)).toPrecision(2)} {'(' + (stock.open/stock.close).toPrecision(2) + '%)'} {op == '+'? <FaCaretUp />:<FaCaretDown />}</p>
            <StockChart chartData={chartData}/>
            </div>
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
          <section className="about">  
              <h2>About</h2>
              {info.branding?.logo_url && 
              <img className="stock-company-icon" src={`${info.branding.logo_url}?apiKey=KKWdGrz9qmi_aPiUD5p6EnWm3ki2i5pl`}
              title='Company Logo' />}      
              <h3>{info.sic_description}</h3>
              <p>{info.description? info.description:unavalible}</p>
              <p>Headquarters: {info.address? [info.address.city +', '+ info.address.state]:unavalible}</p>
              <p>Employees: {convert(info.total_employees)}</p>
              <p>First Listed: {info.list_date? info.list_date:unavalible}</p>
              <p>Website: {info.homepage_url? <Link to={info.homepage_url} target="_blank"> {info.homepage_url}</Link>:unavalible}</p>
          </section>
          <section className="key_stats">
            <h2>Key Statistics</h2>
            <p>Market Cap: {convert(info.market_cap)}</p>
            <p>High today: ${stock.high}</p>
            <p>Low today: ${stock.low}</p>
            <p>Open price: ${stock.open}</p>
            <p>Volume: {convert(stock.volume)}</p>
            <h2>Related Companies</h2>
          </section>
          <section className="related">
              {stock.related.results?.map((r, i) => {
                return (
                <li key={i}>
                <h3>{r.ticker}</h3>
                <Link to={`/stocks/${r.ticker}`}>{r.ticker}</Link></li>)
              })
              }
          </section> 
        </>
    )}
    else return (<p>Stock not found. Please try your search again.</p>)
};

export default StockPage;