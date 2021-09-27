import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newsSample from "../news-sample.json";
import { fetchNews } from "../API/API-calls";

export const fetchNewsAction = createAsyncThunk(
  "news/fetchNews",
  async (coinsNames) => {
    console.log("fetching news:", coinsNames);
    const newsData = await fetchNews(coinsNames);
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
