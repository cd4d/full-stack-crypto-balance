import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRates } from '../API/API-calls';
import { fetchBalance } from "../API/balance";
// Fetch action for use with reducer: automatically calculate balance
export const fetchRatesAction = createAsyncThunk(
  'balance/fetchRates',
  async (action) => {
    const response = await fetchRates(action.coinsList, action.currency);
    console.log("response fetchrates", response);
    const data = await response;
    return { rates: data, currency: action.currency };
  }
);

export const fetchBalanceAction = createAsyncThunk('balance/fetchBalance',
async(action)=>{
  console.log('action', action)
  const response = await fetchBalance()
  console.log("got balance response",  response);
  return response.data
})