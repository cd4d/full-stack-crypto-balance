import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './balance-slice';
import uiReducer from './ui-slice';
import addCoinReducer from './addCoin-slice';
import newsReducer from './news-slice';
import userReducer from './user-slice';
import logger from 'redux-logger'
import tokenMiddleware from './token-middleware';
const store = configureStore({
  reducer: { balanceReducer, uiReducer, addCoinReducer, newsReducer, userReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware , logger
  )
});

export default store;
