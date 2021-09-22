import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, callRefreshToken } from "../API/user";
import { fetchBalance } from "../API/balance";
export const loginAction = createAsyncThunk(
  "user/loginUser",
  async (action) => {
    console.log("login user");
    const response = await login(action);
    const data = await response.data;
    console.log("login response:", data);
    return data;
  }
);
export const refreshAction = createAsyncThunk(
  "user/refreshUser",
  async (action) => {
    console.log("refresh user");
    const response = await callRefreshToken(action);
    const data = await response.data;
    console.log("refresh response:", data);
    return data;
  }
);
export const logoutAction = createAsyncThunk("user/logoutUser", async () => {
  const response = await logout();
  const data = await response.data;
  console.log("logout response:", data);
  return data;
});
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
