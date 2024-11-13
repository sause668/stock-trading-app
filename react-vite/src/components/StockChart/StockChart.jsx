import { Line } from "react-chartjs-2";

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
        }}
        reload='true'
      />
    </div>
  );
}
export default StockChart;
