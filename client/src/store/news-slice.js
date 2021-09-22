import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newsSample from "../news-sample.json";
import { fetchNews } from "../API/API-calls";

export const fetchNewsAction = createAsyncThunk(
  "news/fetchNews",
  async (coinsList) => {
    console.log("fetching news:", coinsList);
    const newsData = await fetchNews(coinsList);
    return { newsData };
  }
);
const newsSlice = createSlice({
  name: "newsSlice",
  initialState: { newsData: newsSample },
  reducers: {},
  extraReducers: {
    [fetchNewsAction.fulfilled]: (state, action) => {
      console.log("fetchnews fulfilled", action);
      state.newsData = action.payload.newsData;
    },
    [fetchNewsAction.rejected]: (state, action) => {
      console.log("fetchnews rejected", action);
    },
  },
});

export const newsActions = newsSlice.actions;
export default newsSlice.reducer;
