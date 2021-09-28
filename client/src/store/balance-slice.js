import { createSlice, current } from "@reduxjs/toolkit";
import {
  addCoinRemoteAction,
  deleteCoinRemoteAction,
  fetchRatesAction,
  fetchRemoteBalanceAction,
  updateQuantityRemoteAction,
} from "./balance-async-thunks";
import {
  updateLocalBalanceSwitch,
  calculateBalance,
  formatData,
  formatResponse,
} from "./balance-functions";
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
  remoteChanges: 0,
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
      return updateLocalBalanceSwitch(state, action);
    },
    calculateLocalBalance(state) {
      return  calculateBalance(state);
    },
    formatLocalData(state) {
      return formatData(state);
    },
  },
  extraReducers: {
    [fetchRatesAction.fulfilled]: (state, action) => {
      return formatResponse(state, action);
    },
    [fetchRemoteBalanceAction.fulfilled]: (state, action) => {
      console.log("got balance fulfilled:", action);
      state.balance = action.payload;
    },
    [fetchRemoteBalanceAction.rejected]: (state, action) => {
      console.log("error fetching balance:", action);
    },
    [deleteCoinRemoteAction.fulfilled]: (state) => {
      state.remoteChanges++
    },
    [addCoinRemoteAction.fulfilled]: (state) => {
      state.remoteChanges++
    },
    [updateQuantityRemoteAction.fulfilled]: (state) => {
      state.remoteChanges++
    }

  },
});

/* Thunk that combines fetching rates and calculateLocalBalance so that calculate balance is loaded right after fetching rates
https://stackoverflow.com/questions/63516716/redux-toolkit-is-it-possible-to-dispatch-other-actions-from-the-same-slice-in-o
https://blog.jscrambler.com/async-dispatch-chaining-with-redux-thunk/  */
export const fetchAndCalculate = (params) => async (dispatch) => {
  await Promise.all([dispatch(fetchRatesAction(params)),
  dispatch(balanceActions.calculateLocalBalance())])

};


export const balanceActions = balanceSlice.actions;

export default balanceSlice.reducer;
