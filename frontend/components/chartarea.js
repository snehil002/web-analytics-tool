import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale,
  PointElement, LineElement, ArcElement, BarElement,
  LineController, DoughnutController,
  Title, Tooltip, Legend } from "chart.js";
import Loading from "./loading";
import styles from "./chartarea.module.css";



ChartJS.register(LinearScale, CategoryScale, PointElement, 
  LineElement, ArcElement, BarElement, LineController, 
  DoughnutController, Title, Tooltip, Legend);


export default function ChartArea({ selectedParams, error, isLoading, dataPoints }) {

  if (error)
    return (
      <div className={styles.myChartDiv}>
        <div className={styles.myErrorDiv}>Error loading!🥺</div>
      </div>
    );

  if (isLoading)
    return (
      <div className={styles.myChartDiv}>
        <Loading />
      </div>
    );

  if (selectedParams["metricName"] == "trafficsource" ||
    selectedParams["metricName"] == "devicewidth")
    
    return (
      <>
        <div className={styles.myChartDiv}>
          <Chart
            className={styles.myChart}
            type="doughnut"
            options={{
              responsive: true
            }}
            data={{
              labels: dataPoints["xaxis"],
              datasets: [{
                label: dataPoints["yaxis"][selectedParams["visitorCountOrAvgTime"]]["ylabel"],
                data: dataPoints["yaxis"][selectedParams["visitorCountOrAvgTime"]]["data"],
                borderWidth: 3,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
              }]
            }}
          />
        </div>
      </>
    );
  
  else

    return (
      <>
        <div className={styles.myChartDiv}>
          <Chart
            className={styles.myChart}
            type="line"
            options={{
              responsive: true
            }}
            data={{
              labels: dataPoints["xaxis"],
              datasets: [{
                label: dataPoints["yaxis"][selectedParams["visitorCountOrAvgTime"]]["ylabel"],
                data: dataPoints["yaxis"][selectedParams["visitorCountOrAvgTime"]]["data"],
                borderWidth: 3,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              }]
            }}
          />
        </div>
      </>
    );
}