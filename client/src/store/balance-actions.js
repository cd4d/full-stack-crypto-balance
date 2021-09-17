import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRates } from '../API/API-calls';
import { fetchBalance } from "../API/balance";
// Fetch action for use with reducer: automatically calculate balance
export const fetchRatesAction = createAsyncThunk(
  'balance/fetchRates',
  async (action) => {
    const response = await fetchRates(action.coinsList, action.currency);
    const data = await response.json();
    return { rates: data, currency: action.currency };
  }
);

export const fetchBalanceAction = createAsyncThunk('balance/fetchBalance',
async(action)=>{
  console.log('action', action)
  const response = await fetchBalance(action.access_token)
  const data = await response.json();
  return data
})