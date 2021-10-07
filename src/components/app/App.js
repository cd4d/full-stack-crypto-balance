import React, { useState, useEffect } from "react";

import Header from "../header/Header";
import Balance from "../balance/Balance";
import CurrencyContext from "../../store/currency-context";
import "./App.css";

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  function changeCurrency(newCurrency) {
    setSelectedCurrency(newCurrency);
  }
  useEffect(() => {
    // TODO cehcl localstorage for reffresh toeken then if any fetch access token
    if (localStorage.getItem("refreshToken")) {
    }
  },[]);
 
  return (
    <CurrencyContext.Provider value={selectedCurrency}>
      <Header
        changeCurrency={(newCurrency) => changeCurrency(newCurrency)}
      ></Header>
      <Balance/>
    </CurrencyContext.Provider>
  );
}

export default App;
