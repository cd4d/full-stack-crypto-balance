import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newsSample from "../news-sample.json";
import { fetchNews } from "../API/API-calls";

export const fetchNewsAction = createAsyncThunk(
  "news/fetchNews",
  async (coinsNames, thunkAPI) => {
    try {
      const response = await fetchNews(coinsNames);
      if (response.status >= 200 && response.status <= 299) {
        return response.data.value;
      } else {
        throw new Error(response && response.message ? response.message : 'Error fetching news')
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
);
const newsSlice = createSlice({
  name: "newsSlice",
  initialState:  newsSample ,
  reducers: {},
  extraReducers: {
    [fetchNewsAction.fulfilled]: (state, action) => {
      return action.payload;
    }
  },
});

export const newsActions = newsSlice.actions;
export default newsSlice.reducer;
