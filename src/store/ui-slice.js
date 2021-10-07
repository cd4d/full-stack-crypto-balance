import { createSlice } from "@reduxjs/toolkit";
import { fetchRatesAction } from "./balance-async-thunks";
import { fetchNewsAction } from "./news-slice";
import { loginAction, registerAction } from "./user-slice";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    error: {
      rates: null,
      news: null,
      addCoin: null,
      login: null,
      register: null,
    },
    isLoading: { rates: false, news: false, login: false, register: false },
    addCoinDisplayed: false,
    displayLoginModal: false,
    displayRegisterModal: false,
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
    displayRegisterModal(state, action) {
      state.displayRegisterModal = action.payload;
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
    [loginAction.pending]: (state) => {
      state.isLoading.login = true;
      state.error.login = null;
    },
    [loginAction.fulfilled]: (state) => {
      state.isLoading.login = false;
      state.error.login = null;
      state.displayLoginModal = false;
    },
    [loginAction.rejected]: (state, action) => {
      state.isLoading.login = false;
      state.error.login = "Error at login";
    },
    [registerAction.pending]: (state) => {
      state.isLoading.register = true;
      state.error.register = null;
    },
    [registerAction.fulfilled]: (state) => {
      state.isLoading.register = false;
      state.error.register = null;
      state.displayRegisterModal = false;
    },
    [registerAction.rejected]: (state, action) => {
      state.isLoading.register = false;
      state.error.register = "Error at registration";
    },
  },
});
export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
