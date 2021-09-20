import axios from 'axios'
import { callRefreshToken } from './user';

const DB_URL = process.env.REACT_APP_DB_URL;
let refreshToken = null
let accessToken = null
// used by tokenMiddleware to set token
export function setRefreshToken(token) {
  refreshToken = token
}
export function setAccessToken(token) {
  accessToken = token
}
const instance = axios.create();
instance.interceptors.request.use(config => {
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken
  }
  return config
},
  error => {
    return Promise.reject(error);
  })
instance.interceptors.response.use(response => {
  return response
},
  async (error) => {
    const originalConfig = error.config
    if (error.response) {
      if (error.response.status === 401 && !originalConfig.alreadyTried) {
        originalConfig.alreadyTried = true
        // first time we get 401, refresh token
        try {
          await callRefreshToken(refreshToken)
          return instance(originalConfig)
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  }
)
export async function fetchBalance(access_token) {
  try {
    const response = await instance.get(DB_URL + "balances/");
    if (response.statusText !== 'OK') {
      let err = new Error();
      err.message = `An error has occurred: ${response.data}`;
      err.status = response.status;

      throw err;
    }
    if (response.status >= 200 && response.status <= 299) {
      console.log("got balance", response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
