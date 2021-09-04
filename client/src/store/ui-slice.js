import { createSlice } from "@reduxjs/toolkit";
import { fetchRatesAction } from "./balance-actions";
import { fetchNewsAction } from "./news-slice";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    error: { rates: null, news: null, addCoin: null },
    isLoading: { rates: false, news: false },
    addCoinDisplayed: false,
  },
  reducers: {
    changeIsLoading(state, action) {
      state.isLoading[action.payload.type] = action.payload.value;
    },
    changeError(state, action) {
      state.error[action.payload.type] = action.payload.value;
    },
    toggleAddCoinDisplayed(state) {
      state.addCoinDisplayed = !state.addCoinDisplayed;
    },
  },
  extraReducers: {
    [fetchRatesAction.pending]: (state) => {
      state.isLoading.rates = true;
      state.error.rates = null;
    },
    [fetchRatesAction.fulfilled]: (state) => {
      state.isLoading.rates = false;
      state.error.rates = null;
    },
    [fetchRatesAction.rejected]: (state) => {
      state.isLoading.rates = false;
      state.error.rates = "Error fetching rates!";
    },
    [fetchNewsAction.pending]: (state) => {
      state.isLoading.news = true;
      state.error.news = null;
    },
    [fetchNewsAction.fulfilled]: (state) => {
      state.isLoading.news = false;
      state.error.news = null;
    },
    [fetchNewsAction.rejected]: (state) => {
      state.isLoading.news = false;
      state.error.news = "Error fetching news.";
    },
  },
});
export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
