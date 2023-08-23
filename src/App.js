import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import CryptoCurrencies from "./components/CryptoCurrencies";
import CryptoDetails from "./components/CryptoDetails";
import Homepage from "./components/Homepage";
import CryptoIcon from "./images/cryptoicon.png";

const App = () => {
  return (
    <div className="">
      <div className="navbar">
        <>
          <Navbar />
          <div className="heading">
            <div className="logo-container flex">
              <img
                src={CryptoIcon}
                className="max-h-10 lg:max-h-16 ml-6"
                alt="CryptoBinge"
              />
              <Link to="/">
                <h1 className="lg:mt-2 ml-5 text-2xl lg:text-4xl font-bold text-primary">
                  CryptoBinge
                </h1>
              </Link>
            </div>
          </div>
        </>
      </div>

      <div className="main my-10">
        <div className="routes">
          <Routes>
            <Route exact path="/" element={<Homepage />} />

            <Route
              exact
              path="/crypto"
              element={<CryptoCurrencies simplified={false} searchbar />}
            />

            <Route exact path="/crypto/:coinID" element={<CryptoDetails />} />

            <Route exact path="/news" element={<News />} />
          </Routes>
        </div>
      </div>

      <div className="footer text-center w-[100%] bg-primary font-bold text-white text-xl p-4 z-[-10]">
        CryptoBinge <br />
        Made by Kushal Sharma
      </div>
    </div>
  );
};

export default App;
