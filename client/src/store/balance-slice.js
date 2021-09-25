import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRatesAction,
  fetchRemoteBalanceAction,
} from "./balance-async-thunks";
import { calculateBalance, formatData,formatResponse } from "./balance-functions";
const initialChartData = {
  labels: ["a", "b", "c"],
  datasets: [
    {
      data: ["1000", "2000", "3000"],
      backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
      hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
    },
  ],
};
const initialBalance = {
  isChanged: false,
  total: 0,
  balance: [
    {
      name: "Bitcoin",
      entryId: 1,
      ticker: "BTC",
      rate: 30000,
      quantity: 0.5,
      subUnit: "Satoshi",
      subUnitToUnit: 100000000,
      value: 0,
      coinId: 1,
    },
    {
      name: "Ethereum",
      entryId: 2,
      ticker: "ETH",
      rate: 2000,
      quantity: 3,
      subUnit: "GWei",
      subUnitToUnit: 1000000000,
      value: 0,
      coinId: 4,
    },
    {
      name: "Tether",
      entryId: 3,
      ticker: "USDT",
      rate: 1,
      quantity: 3000,
      value: 0,
      coinId: 79,
    },
  ],
  formattedData: initialChartData,
};
const balanceSlice = createSlice({
  name: "balance",

  initialState: initialBalance,
  reducers: {
    updateLocalBalance(state, action) {
      return { ...state, balance: action.payload };
    },

    calculateLocalBalance(state) {
      return calculateBalance(state);
    },
    formatLocalData(state) {
      return formatData(state);
    },
  },
  extraReducers: {
    [fetchRatesAction.fulfilled]: (state, action) => {
      return formatResponse(state,action)
    },
    [fetchRemoteBalanceAction.fulfilled]: (state, action) => {
      console.log("got balance fulfilled:", action);
      state.balance = action.payload;
    },
    [fetchRemoteBalanceAction.rejected]: (state, action) => {
      console.log("error balance:", action);
    },
  },
});

/* Thunk that combines fetching rates and calculateLocalBalance so that calculate balance is loaded right after fetching rates
https://stackoverflow.com/questions/63516716/redux-toolkit-is-it-possible-to-dispatch-other-actions-from-the-same-slice-in-o  */
export const fetchAndCalculate = (params) => async (dispatch) => {
  await dispatch(fetchRatesAction(params));
  dispatch(balanceActions.calculateLocalBalance());
};
export const balanceActions = balanceSlice.actions;

export default balanceSlice.reducer;
