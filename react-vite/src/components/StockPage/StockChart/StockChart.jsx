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
                usePointStyle: true,
                color: '#e8e6e3'
              }
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              display: true,
              ticks: {
                color: '#e8e6e3'
              }
            }
          },
          interaction: {
            mode: "nearest",
            axis: "xy",
            intersect: false,
          },
          responsive: true,
          maintainAspectRatio: false
        }}
        reload='true'
      />
    </div>
  );
}
export default StockChart;
