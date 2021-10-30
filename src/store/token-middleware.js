import { setAccessToken, setRefreshToken } from "../API/interceptors";

// get the tokens from store and export them to the API files
const tokenMiddleware = (storeAPI) => (next) => async (action) => {
  const state = storeAPI.getState();
  if (
    action.type === "balance/fetchRemoteBalance/pending" ||
    action.type === "balance/updateRemoteBalance/pending" ||
    action.type === "balance/addRemoteCoin/pending" ||
    action.type === "balance/deleteRemoteCoin/pending" ||
    action.type === "user/getUser/pending"
  ) {
    const accessToken = state.userReducer.accessToken;
    const refreshToken = state.userReducer.refreshToken;
    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  }

  return next(action);
};

export default tokenMiddleware;
