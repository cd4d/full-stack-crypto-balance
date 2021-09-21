import axios from "axios";
import { callRefreshToken } from "./user";

const DB_URL = process.env.REACT_APP_DB_URL;
let refreshToken = null;
let accessToken = null;
// used by tokenMiddleware to set token
export function setRefreshToken(token) {
  refreshToken = token;
}
export function setAccessToken(token) {
  accessToken = token;
}
const instance = axios.create();
instance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig.alreadyTried) {
        originalConfig.alreadyTried = true;
        // first time we get 401, refresh token
        console.log("first time, refreshing token now", originalConfig);
        //   {
        //     "url": "http://127.0.0.1:8000/balances/",
        //     "method": "get",
        //     "headers": {
        //         "Accept": "application/json, text/plain, */*",
        //         "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyMTc3MDYyLCJqdGkiOiI1OWY3MmEzZDZkNmY0YWY4OTQ4OGZmYWU0YWVjMzVhNSIsInVzZXJfaWQiOjF9.XalaS6u1oit19OTZuwhCvp9_xHVzpWVJCuTZ-vWGaDw"
        //     },
        //     "transformRequest": [
        //         null
        //     ],
        //     "transformResponse": [
        //         null
        //     ],
        //     "timeout": 0,
        //     "xsrfCookieName": "XSRF-TOKEN",
        //     "xsrfHeaderName": "X-XSRF-TOKEN",
        //     "maxContentLength": -1,
        //     "maxBodyLength": -1,
        //     "transitional": {
        //         "silentJSONParsing": true,
        //         "forcedJSONParsing": true,
        //         "clarifyTimeoutError": false
        //     },
        //     "alreadyTried": true
        // }

        try {
          let newToken = null
          const response = await callRefreshToken(refreshToken);
          console.log('response', await response);
          if (response && response.data.access) {
            const updatedConfig = {
              ...originalConfig,
              headers: {
                ...originalConfig.headers,
                Authorization: "Bearer " + response.data.access,
              },
            };
            console.log('error.config', error.config);
            error.config.headers['Authorization'] = "Bearer " + response.data.access
            return error.config;

          }
          console.log("new token", newToken);
          console.log("typeof token", typeof newToken);
          // TODO not sending refreshed token

          // instance.defaults.headers["Authorization"] = "Bearer " + newToken;


          //   {
          //     "url": "http://127.0.0.1:8000/balances/",
          //     "method": "get",
          //     "headers": {
          //         "Accept": "application/json, text/plain, */*",
          //         "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyMTc4NDAyLCJqdGkiOiJhYzlmOWRlYzZmZmU0NmUwYmE2ZDBlYWQ0NGI5MjEyYiIsInVzZXJfaWQiOjF9._o3kNvCoqgi6j29gw0tJb-y1zU6KR8lk-0TS0TURiU0"
          //     },
          //     "transformRequest": [
          //         null
          //     ],
          //     "transformResponse": [
          //         null
          //     ],
          //     "timeout": 0,
          //     "xsrfCookieName": "XSRF-TOKEN",
          //     "xsrfHeaderName": "X-XSRF-TOKEN",
          //     "maxContentLength": -1,
          //     "maxBodyLength": -1,
          //     "transitional": {
          //         "silentJSONParsing": true,
          //         "forcedJSONParsing": true,
          //         "clarifyTimeoutError": false
          //     },
          //     "alreadyTried": true
          // }
        } catch (err) {
          return Promise.reject(err);
        }
      }
      // return Promise.reject(error);
    }
  }
);
export async function fetchBalance(access_token) {
  try {
    const response = await instance.get(DB_URL + "balances/");
    if (response.statusText !== "OK") {
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
