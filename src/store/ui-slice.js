import { createSlice } from '@reduxjs/toolkit';
import { fetchRatesAction } from './balance-async-thunks';
import { fetchNewsAction } from './news-slice';
import { loginAction } from './user-slice';

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    error: { rates: null, news: null, addCoin: null,login:null },
    isLoading: { rates: false, news: false,login:false },
    addCoinDisplayed: false,
    displayLoginModal:false
  },
  reducers: {
    changeIsLoading(state, action) {
      state.isLoading[action.payload.type] = action.payload.value;
    },
    changeError(state, action) {
      state.error[action.payload.type] = action.payload.value;
    },
    clearError(state, action) {
      state.error[action.payload.type] = null;
    },
    toggleAddCoinDisplayed(state) {
      state.addCoinDisplayed = !state.addCoinDisplayed;
    },
    displayLoginModal(state, action) {
      state.displayLoginModal = action.payload;
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
      state.error.rates = 'Error fetching rates!';
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
      state.error.news = 'Error fetching news.';
    },
    [loginAction.pending]: (state) => {
      state.isLoading.login = true;
      state.error.login = null;
    },
    [loginAction.fulfilled]: (state) => {
      state.isLoading.login = false;
      state.error.login = null;
      state.displayLoginModal = false
    },
    [loginAction.rejected]: (state,action) => {
      state.isLoading.login = false;
      state.error.login = 'Error at login';
    },
  },
});
export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
