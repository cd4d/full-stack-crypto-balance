import { configureStore } from "@reduxjs/toolkit";
import  balanceReducer  from "./balance-slice";
import  uiReducer  from "./ui-slice";
import addCoinReducer from "./addCoin-slice";
import newsReducer from "./news-slice";

const store = configureStore({
  reducer: { balanceReducer, uiReducer,addCoinReducer,newsReducer },
});

export default store;
