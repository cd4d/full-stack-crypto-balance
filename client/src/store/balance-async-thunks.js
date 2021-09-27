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
    console.log("response fetchrates", response);
    const data = await response;
    return { rates: data, currency: action.currency };
  }
);

export const fetchRemoteBalanceAction = createAsyncThunk(
  "balance/fetchBalance",
  async (action) => {
    console.log("action", action);
    const response = await fetchBalance();
    console.log("got balance response", response);
    return response.data;
  }
);

export const updateQuantityRemoteAction = createAsyncThunk(
  "balance/updateBalance",
  async (payload) => {
    console.log("payload", payload);
    const response = await updateQuantity(payload.entryId, payload.quantity);
    return response.data;
  }
);
export const addCoinRemoteAction = createAsyncThunk(
  "balance/updateBalance",
  async (payload) => {
    console.log("payload", payload);
    const response = await addCoin(payload);
    return response.data;
  }
);
export const deleteCoinRemoteAction = createAsyncThunk(
  "balance/updateBalance",
  async (payload) => {
    console.log("payload", payload);
    const response = await deleteCoin(payload.entryId);
    return response;
  }
);
