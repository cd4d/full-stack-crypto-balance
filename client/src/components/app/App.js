import React, { useState } from "react";
import Header from "../header/Header";
import Balance from "../balance/Balance";
import  CurrencyContext  from "../../store/currency-context";
import "./App.css";

function App() {
  // replace this with context?
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  function changeCurrency(newCurrency) {
    setSelectedCurrency(newCurrency);
  }

  return (
    <CurrencyContext.Provider value={selectedCurrency}>
      <Header
        changeCurrency={(newCurrency) => changeCurrency(newCurrency)}
      ></Header>
      <Balance ></Balance>
    </CurrencyContext.Provider>
  );
}

export default App;
