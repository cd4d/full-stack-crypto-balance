import { setAccessToken, setRefreshToken } from "../API/balance";
import { setAccessTokenUser } from "../API/user";

// get the tokens from store and export them to the API files
const tokenMiddleware = (storeAPI) => (next) => (action) => {
  const state = storeAPI.getState();
  if (action.type === "balance/fetchRemoteBalance/pending") {
    const accessToken = state.userReducer.accessToken;
    const refreshToken = state.userReducer.refreshToken;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }
  if (action.type === "user/loginUser/fulfilled") {
    const refreshToken = state.userReducer.refreshToken;
    setRefreshToken(refreshToken);
  }
  if (action.type === "user/getUser/pending") {
    const accessToken = state.userReducer.accessToken;
    console.log("seeting accesstoken for api call", accessToken);
    setAccessTokenUser(accessToken);
  }

  return next(action);
};

export default tokenMiddleware;
