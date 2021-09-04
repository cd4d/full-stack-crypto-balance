import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newsSample from "../news-sample.json";
import { fetchNews } from "../API/API-calls";

export const fetchNewsAction = createAsyncThunk(
  "news/fetchNews",
  async (coinsList) => {
    console.log("fetching news:", coinsList);
    const response = await fetchNews(coinsList);
    const data = await response.json();
    return { newsData: data };
  }
);
const newsSlice = createSlice({
  name: "newsSlice",
  initialState: {newsData:newsSample},
  reducers: {},
  extraReducers: {
    [fetchNewsAction.fulfilled]: (state, action) => {
      state.newsData = action.payload.newsData;
    },
  },
});

export const newsActions = newsSlice.actions;
export default newsSlice.reducer;
