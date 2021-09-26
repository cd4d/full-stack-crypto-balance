export const DELETE_COIN = "DELETE_COIN";
export const ADD_COIN = "ADD_COIN";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";

export function updateBalanceSwitch(state, action) {
  console.log("in switch action", action);
  switch (action.payload.changeRequested) {
    case UPDATE_QUANTITY:
      return;
    case ADD_COIN:
      return;
    case DELETE_COIN:
      const updatedBalance = state.balance.filter(
        (el) => el.entryId !== action.payload.data.entryId
      );
      return { ...state, balance: updatedBalance };
    default:
      return state;
  }
}

export function calculateBalance(state) {
  state.total = 0;
  state.balance.map((coin) => {
    if (coin.rate && coin.quantity) {
      coin.value = +coin.rate * +coin.quantity;
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
}

export function formatData(state) {
  let tempData = { coinNames: [], coinValues: [] };
  state.balance.map((coin) => {
    tempData.coinNames.push(coin.name);
    tempData.coinValues.push(coin.value);
    return coin;
  });
  state.formattedData.labels = tempData.coinNames;
  state.formattedData.datasets[0].data = tempData.coinValues;
}

export function formatResponse(state, action) {
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
}
