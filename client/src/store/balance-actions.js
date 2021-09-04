import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRates } from "../API/API-calls";
// Fetch action for use with reducer: automatically calculate balance
export const fetchRatesAction = createAsyncThunk(
  "balance/fetchRates",
  async (action) => {
    const response = await fetchRates(action.coinsList, action.currency);
    const data = await response.json();
    return { rates: data, currency: action.currency };
  }
);
