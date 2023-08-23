import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { coinID } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinID);
  const { data: coinHistory, refetch } = useGetCryptoHistoryQuery({
    coinID,
    timePeriod,
  });
  console.log(coinHistory);
  useEffect(() => {
    refetch();
    console.log(coinHistory);
  }, [timePeriod, refetch, coinHistory]);

  const cryptoDetails = data?.data?.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
    },
    { title: "Rank", value: cryptoDetails?.rank },
    {
      title: "24h Volume",
      value: `${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
    },
    {
      title: "Market Cap",
      value: `${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
    },
  ];

  const genericStats = [
    { title: "Number Of Markets", value: cryptoDetails?.numberOfMarkets },
    { title: "Number Of Exchanges", value: cryptoDetails?.numberOfExchanges },
    { title: "Aprroved Supply", value: cryptoDetails?.supply?.confirmed },
    {
      title: "Total Supply",
      value: `${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
    },
    {
      title: "Circulating Supply",
      value: `${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
    },
  ];

  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      <div className="coin-detail-container m-4 p-2">
        <div className="coin-heading-container text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-[900]">
            {cryptoDetails.name} ({cryptoDetails.symbol})
          </h1>
        </div>

        <select
          defaultValue="7d"
          className="select-timeprd border-b-2 border-black rounded-lg p-2 my-6 focus:outline-none"
          placeholder="Select Time Period"
          onChange={(e) => {
            setTimePeriod(e.target.value);
          }}
        >
          {time.map((date) => (
            <option key={date}>{date}</option>
          ))}
        </select>

        {coinHistory && (
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails.price)}
            coinName={cryptoDetails.name}
          />
        )}

        <div className="grid grid-cols-12 gap-6">
          <div className="stats-container col-span-12 md:col-span-6 m-6 bg-blue-100 rounded-lg shadow-lg">
            <div className="coin-value-stats">
              <div className="coin-value-stats-heading mb-4 p-4">
                <h1 className="text-center text-md sm:text-lg md:text-xl font-bold">
                  {cryptoDetails.name} Value Statistics
                </h1>
                <p className="text-center italic">
                  An overview showing the Statistics of {cryptoDetails.name}
                </p>
              </div>
              {stats.map((stat, index) => (
                <div className="coin-stats" key={index}>
                  <div className="coin-stats-name flex justify-between p-4 hover:bg-blue-200">
                    <h2>{stat.title}</h2>
                    <p className="font-[800]">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="other-stats-container col-span-12 md:col-span-6 m-6 bg-blue-100 rounded-lg shadow-lg">
            <div className="coin-value-stats">
              <div className="coin-value-stats-heading mb-4 p-4">
                <h1 className="text-center text-md sm:text-lg md:text-xl font-bold">
                  {cryptoDetails.name} Other Statistics
                </h1>
                <p className="text-center italic">
                  Other Statistics of {cryptoDetails.name}
                </p>
              </div>
              {genericStats.map((stat, index) => (
                <div className="coin-stats" key={index}>
                  <div className="coin-stats-name flex justify-between p-4 hover:bg-blue-200">
                    <h2>{stat.title}</h2>
                    <p className="font-[800]">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="coin-desc-link my-12">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl my-4">
            What is {cryptoDetails.name}
          </h1>
          {HTMLReactParser(cryptoDetails.description)}
        </div>
      </div>
    </>
  );
};

export default CryptoDetails;
