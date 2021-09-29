import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRates } from "../API/API-calls";
import {
  fetchBalance,
  updateQuantity,
  deleteCoin,
  addCoin,
} from "../API/balance";
// Fetch action for use with reducer: automatically calculate balance
export const fetchRatesAction = createAsyncThunk(
  "balance/fetchRates",
  async (action) => {
    const response = await fetchRates(action.coinsNames, action.currency);
    const data = await response;
    return { rates: data, currency: action.currency };
  }
);

export const fetchRemoteBalanceAction = createAsyncThunk(
  "balance/fetchBalance",
  async (action) => {
    const response = await fetchBalance();
    return response.data;
  }
);

export const updateQuantityRemoteAction = createAsyncThunk(
  "balance/updateBalance",
  async (payload, thunkAPI) => {
    const response = await updateQuantity(payload.entryId, payload.quantity);
    if (response.status >= 200 && response.status <= 299) {
      return await thunkAPI.dispatch(fetchRemoteBalanceAction());
    }
    // return response.data;
  }
);
export const addCoinRemoteAction = createAsyncThunk(
  "balance/updateBalance",
  async (payload, thunkAPI) => {
    const response = await addCoin(payload);
    console.log("addCoinRemoteAction", response);
    if (response.status === 201) {
      return await thunkAPI.dispatch(fetchRemoteBalanceAction());
    }

    // return response.data;
  }
);
export const deleteCoinRemoteAction = createAsyncThunk(
  "balance/updateBalance",
  async (payload, thunkAPI) => {
    await deleteCoin(payload.entryId);
    return await thunkAPI.dispatch(fetchRemoteBalanceAction());
  }
);
