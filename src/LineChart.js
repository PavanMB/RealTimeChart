import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const socket = io('http://localhost:3001'); // Connect to WebSocket server

function LineChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Real-time Data',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    
    // Listen for data from the server
    socket.on('data', (data) => {
      setChartData((prevData) => {
        const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
        const newData = [...prevData.datasets[0].data, data];

        return {
          labels: newLabels.slice(-7), // Keep only the last 10 labels
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData.slice(-7), // Keep only the last 10 data points
            },
          ],
        };
      });
    });

    // Clean up the connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ width: '85%', margin: 'auto' }}>
      <Line data={chartData} />
    </div>
  );
}

export default LineChart;
