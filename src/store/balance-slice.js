import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRatesAction,
  fetchRemoteBalanceAction,
} from "./balance-async-thunks";
import {
  updateLocalBalanceSwitch,
  calculateBalance,
  formatData,
  formatResponse,
  convertQuantityToNum,
} from "./balance-functions";
import { logoutAction } from "./user-slice";
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
const initialBalanceState = {
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
      slug: "bitcoin",
    },
    {
      name: "Ethereum",
      slug: "ethereum",
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
      slug: "tether",
      entryId: 3,
      ticker: "USDT",
      rate: 1,
      quantity: 3000,
      value: 0,
      coinId: 79,
    },
    {
      entryId: 34,
      owner: 1,
      quantity: 4,
      coinId: 7,
      name: "Basic Attention Token",
      slug: "basic-attention-token",
      ticker: "bat",
      value: 0,
      rate: 0.1,
      image:
        "https://assets.coingecko.com/coins/images/677/large/basic-attention-token.png?1547034427",
    },
  ],
  formattedData: initialChartData,
};
const balanceSlice = createSlice({
  name: "balance",

  initialState: initialBalanceState,
  reducers: {
    updateLocalBalance(state, action) {
      return updateLocalBalanceSwitch(state, action);
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
      return formatResponse(state, action);
    },
    [fetchRemoteBalanceAction.fulfilled]: (state, action) => {
      state.balance = action.payload;
      convertQuantityToNum(state);
    },
    [logoutAction.fulfilled]: () => {
      return initialBalanceState;
    },
  },
});

/* Thunk that combines fetching rates and calculateLocalBalance so that calculate balance is loaded right after fetching rates
https://stackoverflow.com/questions/63516716/redux-toolkit-is-it-possible-to-dispatch-other-actions-from-the-same-slice-in-o
https://blog.jscrambler.com/async-dispatch-chaining-with-redux-thunk/  */
export const fetchAndCalculate = (coinsSlugs, currency) => async (dispatch) => {
  await Promise.all([
    dispatch(fetchRatesAction({ coinsSlugs, currency })),
    dispatch(balanceActions.calculateLocalBalance()),
  ]);
};

export const balanceActions = balanceSlice.actions;

export default balanceSlice.reducer;
