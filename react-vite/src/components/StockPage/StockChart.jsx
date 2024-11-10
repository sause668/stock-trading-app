import { Line } from "react-chartjs-2";

function StockChart({ chartData }) {
    console.log(chartData)
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Stock Chart"
            },
            legend: {
              display: true
            }
          }
        }}
        reload='true'
      />
    </div>
  );


}
export default StockChart;
