import { Line } from "react-chartjs-2";
import { FaConnectdevelop } from "react-icons/fa6";

// const handleHover = (event, item, legend) => {
//   console.log(legend)
// }

function StockChart({ chartData }) {
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
            tooltip: {
              displayColors: false,
              titleAlign: 'center',
              bodyAlign: 'center',
              caretSize: 10,
              caretPadding: 5,
              callbacks: { 
                label: (l) => '$' + l.raw
              }
    
            },
            legend: {
              display: true,
              labels: {
                usePointStyle: true
              }
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          },
          interaction: {
            mode: "nearest",
            axis: "xy",
            intersect: false,
          },
          // onHover: handleHover
        }}
        reload='true'
      />
    </div>
  );


}
export default StockChart;
