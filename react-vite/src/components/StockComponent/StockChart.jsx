import { Line } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";

function StockChart({ stock }) {
    const chartData = [stock.preMarket, stock.open, stock.high, stock.low, stock.close, stock.afterHours]
  return (
    <>
      <h1>Stock chart for {stock.symbol}</h1>
    </>
  )

}
export default StockChart;
