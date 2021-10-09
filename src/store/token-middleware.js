import { setAccessToken } from "../API/balance";
import { setAccessTokenUser } from "../API/user";

// get the tokens from store and export them to the API files
const tokenMiddleware = (storeAPI) => (next) => (action) => {
  const state = storeAPI.getState();
  if (action.type === "balance/fetchRemoteBalance/pending") {
    const accessToken = state.userReducer.accessToken;
    setAccessToken(accessToken);
  }
  if (action.type === "user/loginUser/fulfilled") {
  }
  if (action.type === "user/getUser/pending") {
    const accessToken = state.userReducer.accessToken;
    setAccessTokenUser(accessToken);
  }

  return next(action);
};

export default tokenMiddleware;
