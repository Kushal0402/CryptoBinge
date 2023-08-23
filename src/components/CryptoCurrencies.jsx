import React from "react";
import { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";

const CryptoCurrencies = ({ simplified, searchbar }) => {
  const count = simplified ? 10 : 50;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [search, setSearch] = useState("");
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, search]);

  if (isFetching) return <p>Loading data please wait....</p>;
  return (
    <>
      {searchbar ? (
        <div className="search-crypto">
          <input
            type="text"
            className="p-2 m-4 border-primary focus:outline-none focus:border-sky-500 shadow-lg border-2 w-[50%] md:w-[30%] lg:w-[20%]
        placeholder:italic placeholder:text-slate-400"
            placeholder="Search Crypto"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
      ) : (
        ""
      )}
      <div className="crypto-card-container mt-12 grid grid-cols-12">
        {cryptos?.map((currency) => (
          <div
            className="crypto-card col-span-12 sm:col-span-6 lg:col-span-3 gap-3 m-4 p-4 shadow-md hover:shadow-xl hover:scale-105 ease duration-200 border-t-2 border-primary"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <div>
                <div className="flex justify-between my-4">
                  <h1 className="font-bold underline text-lg">{`${currency.rank}. ${currency.name}`}</h1>
                  <img
                    className="crypto-img h-8"
                    alt={currency.name}
                    src={currency.iconUrl}
                  ></img>
                </div>
                <p>Price: {millify(currency.price)}</p>
                <p className="my-2">
                  Market Cap: {millify(currency.marketCap)}
                </p>
                <p>Daily Change: {millify(currency.change)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CryptoCurrencies;
