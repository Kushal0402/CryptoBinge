import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import CryptoCurrencies from "./CryptoCurrencies";
import News from "./News";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(1);
  const globalStats = data?.data?.stats;

  if (isFetching) {
    return (
      <div className="text-2xl sm:text-4xl font-bold m-4">Loading Data...</div>
    );
  } else
    return (
      <>
        <div className="stats-container grid gap-3 grid-cols-2">
          <h1 className="text-2xl sm:text-4xl font-bold m-4 col-span-2 text-primary">
            Global Crypto Stats
          </h1>
          <div className="col-span-2 sm:col-span-1 p-4">
            <h2 className="text-xl sm:text-2xl font-bold">
              Total Cryptocurrencies
            </h2>
            <p className="text-lg sm:text-xl">{globalStats.total}</p>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4">
            <h2 className="text-xl sm:text-2xl font-bold">Total Exchanges</h2>
            <p className="text-lg sm:text-xl">
              {millify(globalStats.totalExchanges)}
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4">
            <h2 className="text-xl sm:text-2xl font-bold">Total Market Cap</h2>
            <p className="text-lg sm:text-xl">
              {millify(globalStats.totalMarketCap)}
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4">
            <h2 className="text-xl sm:text-2xl font-bold">Total 24h Volume</h2>
            <p className="text-lg sm:text-xl">
              {millify(globalStats.total24hVolume)}
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4">
            <h2 className="text-xl sm:text-2xl font-bold">Total Markets</h2>
            <p className="text-lg sm:text-xl">
              {millify(globalStats.totalMarkets)}
            </p>
          </div>
        </div>

        <div className="subhead-container mx-4 my-14 text-sm sm:text-md">
          <div className="flex justify-between">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary">
              Top Cryptocurrencies
            </h1>

            <h1 className="text-xs sm:text-lg md:text-xlmt-2 md:mt-0 font-bold text-primary ease duration-200 hover:text-black underline">
              <Link to="/crypto">Show more</Link>
            </h1>
          </div>

          <CryptoCurrencies simplified searchbar={false} />
        </div>

        <div className="subhead-container mx-4 my-8 text-sm sm:text-md">
          <div className="flex justify-between">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary">
              Latest CryptoCurrency news
            </h1>

            <h1 className="text-xs sm:text-lg md:text-x mt-2 font-bold text-primary ease duration-200 hover:text-black underline">
              <Link to="/news">Show more</Link>
            </h1>
          </div>
          <News simplified />
        </div>
      </>
    );
};

export default Homepage;
