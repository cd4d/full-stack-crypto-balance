import { createSlice } from "@reduxjs/toolkit";
import { fetchRatesAction } from "./balance-actions";
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
      id: "bitcoin",
      symbol: "BTC",
      rate: 30000,
      amount: 0.5,
      subUnit: "Satoshi",
      subUnitToUnit: 100000000,
      value: 0,
    },
    {
      name: "Ethereum",
      id: "ethereum",
      symbol: "ETH",
      rate: 2000,
      amount: 3,
      subUnit: "GWei",
      subUnitToUnit: 1000000000,
      value: 0,
    },
    {
      name: "Tether",
      id: "tether",
      symbol: "USDT",
      rate: 1,
      amount: 3000,
      value: 0,
    },
  ],
  formattedData: initialChartData,
};
const balanceSlice = createSlice({
  name: "balance",
  
  initialState: initialBalance,
  reducers: {
    updateBalance(state, action) {
      state.balance = action.payload;
    },
    calculateBalance(state, action) {
      //console.log(state.balance);
      state.total = 0;
      state.balance.map((coin) => {
        //console.log(coin);
        if (coin.rate && coin.amount) {
          coin.value = +coin.rate * +coin.amount;
        }
        if (coin.value) {
          state.total += coin.value;
        }
        // get the weight of each
        if (state.total && state.total > 0) {
          if (coin.value) {
            coin.weight = coin.value / state.total;
          }
        }
        return coin;
      });
    },
    formatData(state) {
      let tempData = { coinNames: [], coinValues: [] };
      state.balance.map((coin) => {
        tempData.coinNames.push(coin.name);
        tempData.coinValues.push(coin.value);
        return coin;
      });
      state.formattedData.labels = tempData.coinNames;
      state.formattedData.datasets[0].data = tempData.coinValues;
    },
  },
  extraReducers: {
    [fetchRatesAction.fulfilled]: (state, action) => {
      // console.log(action.payload);
     
      //   console.log("DONE fetching rates");
        let formattedResponse;
        formattedResponse = action.payload.rates;
        state.balance.map((coin) => {
          const responseKeys = Object.keys(formattedResponse);
          for (let i = 0; i < responseKeys.length; i++) {
            let key = responseKeys[i];
            if (key === coin.name.toLowerCase()) {
              coin.rate =
                formattedResponse[key][
                  action.payload.currency ? action.payload.currency : "usd"
                ];
              break;
            }
          }
          return coin;
        });
      
    },
  },
});

/* Thunk that combines fetching rates and calculatebalance so that calculate balance is loaded right after fetching rates
https://stackoverflow.com/questions/63516716/redux-toolkit-is-it-possible-to-dispatch-other-actions-from-the-same-slice-in-o  */
export const fetchAndCalculate = (params) => async (dispatch) => {
  await dispatch(fetchRatesAction(params));
  dispatch(balanceActions.calculateBalance());
};
export const balanceActions = balanceSlice.actions;

export default balanceSlice.reducer;
