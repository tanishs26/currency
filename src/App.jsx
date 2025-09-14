import React, { useState } from "react";
import Input from "../components/Input";
import useCurrencyInfo from "../hooks/useCurrencyInfo";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState(null);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
    console.log(convertedAmount);
  };
  return (
    <div
      className="w-full h-screen   flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/316902/pexels-photo-316902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="w-full px-4">
        <h1 className="text-5xl md:text-5xl lg:text-7xl font-bold pb-30 text-neutral-300 text-center">Currency Converter</h1>
        <div className="w-full max-w-md    mx-auto border border-gray-60 rounded-lg p-6 backdrop-blur-sm  bg-white/15">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <Input
                // className=""
                label="From"
                amount={amount}
                currencyOptions={options}
                selectCurrency={from}
                onAmountChange={(a) => setAmount(a)}
                onCurrencyChange={(currency) => setFrom(currency)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white ring-2 ring-neutral-800  active:scale-105 rounded-md bg-neutral-800 text-white px-2 py-0.5"
              >
                SWAP
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <Input
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                selectCurrency={to}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-neutral-900 text-shadow-sm active:scale-105 text-white px-4 py-3 rounded-lg cursor-pointer"
            >
              Convert {`${from.toUpperCase()} to ${to.toUpperCase()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
