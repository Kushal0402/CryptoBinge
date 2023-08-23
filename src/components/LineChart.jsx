import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimeStamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  console.log(new Date(1691580000));

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#000000",
        borderColor: "#000000",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="chart-header">
        <h1 className="text-md sm:text-lg md:text-xl font-bold">
          {coinName} Price Chart
        </h1>
        <div className="price-container">
          <h1 className="text-md sm:text-lg md:text-xl font-bold">
            Price Change: {coinHistory?.data?.change}%
          </h1>
          <h1 className="text-md sm:text-lg md:text-xl font-bold">
            Current Price: ${currentPrice}
          </h1>
        </div>
      </div>

      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
