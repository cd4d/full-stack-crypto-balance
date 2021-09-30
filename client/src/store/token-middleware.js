import { setAccessToken, setRefreshToken } from "../API/balance";
import { addCoinActions } from "./addCoin-slice";

// get the tokens from store and export them to the API files
const tokenMiddleware = (storeAPI) => (next) => (action) => {
  const state = storeAPI.getState();
  if (action.type === "balance/fetchRemoteBalance/pending") {
    const accessToken = state.userReducer.accessToken;
    const refreshToken = state.userReducer.refreshToken;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }
  if (addCoinActions.type === "user/loginUser/fulfilled") {
    const refreshToken = state.userReducer.refreshToken;
    setRefreshToken(refreshToken);
  }

  return next(action);
};

export default tokenMiddleware;
