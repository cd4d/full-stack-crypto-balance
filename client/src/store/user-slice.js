import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, callRefreshToken } from "../API/user";
export const loginAction = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await login(payload);
      if (response instanceof Error) throw new Error(response);
      const data = await response.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const refreshAction = createAsyncThunk(
  "user/refreshUser",
  async (payload, thunkAPI) => {
    try {
      console.log("refresh user");
      const response = await callRefreshToken(payload);
      if (response instanceof Error) throw response;
      const data = await response.data;
      console.log("refresh response:", data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const logoutAction = createAsyncThunk(
  "user/logoutUser",
  async (payload, thunkAPI) => {
    try {
      const response = await logout();
      const data = await response.data;
      if (response instanceof Error) throw response;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const emptyUser = {
  id: null, // "pk" in response
  username: null,
  email: null,
  accessToken: null,
  refreshToken: null,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState: emptyUser,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
  },
  extraReducers: {
    [loginAction.fulfilled]: (state, action) => {
      state.id = action.payload.user.pk;
      state.username = action.payload.user.username;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.payload.refresh_token)
      );
    },
    [loginAction.rejected]: () => {
    },
    [refreshAction.fulfilled]: (state, action) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
    [logoutAction.fulfilled]: () => {
      localStorage.removeItem("refreshToken");
      return emptyUser;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
