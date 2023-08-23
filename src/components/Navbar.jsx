import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CryptoIcon from "../images/cryptoicon.png";
import { BiBitcoin, BiNews } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const [navToggle, setnavToggle] = useState(true);
  const handleNavToggle = () => {
    setnavToggle(!navToggle);
  };

  return (
    <>
      <div
        className={
          !navToggle
            ? `nav-container fixed  bg-gray-300 min-h-screen ease-in duration-500 left-0
            w-[100%]`
            : `fixed left-[-100%] min-h-screen w-[100%] ease-in duration-500`
        }
      >
        <div className="logo-container flex">
          <img
            src={CryptoIcon}
            className="max-h-8 md:max-h-10 ml-6 mt-5"
            alt="CryptoBinge"
          />
          <Link to="/">
            <h1 className="m-4 text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              CryptoBinge
            </h1>
          </Link>
        </div>
        <div className="nav-link-container">
          <div className="my-6 mx-5 flex font-bold text-secondary text-md sm:text-xl md:text-2xl hover:underline">
            <AiFillHome className="inline mt-1 mx-2" />
            <Link
              to="/"
              onClick={() => {
                setnavToggle(true);
              }}
            >
              <p> Home </p>
            </Link>
          </div>
          <div className="my-6 mx-5 flex font-bold text-secondary text-md sm:text-xl md:text-2xl hover:underline">
            <BiBitcoin className="inline mt-1 mx-2" />
            <Link
              to="/crypto"
              onClick={() => {
                setnavToggle(true);
              }}
            >
              CryptoCurrencies
            </Link>
          </div>
          <div className="my-6 mx-5 flex font-bold text-secondary text-md sm:text-xl md:text-2xl hover:underline">
            <BiNews className="inline mt-1 mx-2" />
            <Link
              to="/news"
              onClick={() => {
                setnavToggle(true);
              }}
            >
              News
            </Link>
          </div>
        </div>
      </div>
      <button onClick={() => handleNavToggle()}>
        {navToggle ? (
          <PiDotsThreeOutlineVerticalLight
            size={25}
            className="fixed top-0 right-0 mt-7 mx-4 p-0.5 border-2 rounded-md border-black"
          />
        ) : (
          <ImCross
            size={25}
            className="fixed top-0 right-0 mt-7 mx-4 p-1 border-2 rounded-md border-black"
          />
        )}
      </button>
    </>
  );
};

export default Navbar;
