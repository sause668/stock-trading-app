import { Line } from "react-chartjs-2";

function StockChart({ stock }) {
    const chartData = [stock.preMarket, stock.open, stock.high, stock.low, stock.close, stock.afterHours]
  
    return [stock.symbol, "Chart Data:", chartData]

}
export default StockChart;
