import { useSelector } from "react-redux";

const Stock = () => {
  const stock = useSelector(state => state.stock.stock)
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
        </>
    )}
    else return (<p>Stock Not Found</p>)
};

export default Stock;
