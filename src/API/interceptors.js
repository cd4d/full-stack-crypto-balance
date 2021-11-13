import axios from "axios";
import { callRefreshToken } from "./user";
let accessToken = null;
let refreshToken = null;
// used by tokenMiddleware to set token
export function setRefreshToken(token) {
  refreshToken = token;
}
export function setAccessToken(token) {
  accessToken = token;
}
const axiosTokenInterceptorInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
  },
});
// Request interceptor for API calls
axiosTokenInterceptorInstance.interceptors.request.use(
  async (config) => {
    const response = await callRefreshToken(refreshToken);
    config.headers = {
      Authorization: "Bearer " + response.data.access,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosTokenInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalRequest.alreadyTried) {
        originalRequest.alreadyTried = true;
        // first time we get 401, refresh token
        console.log("refrexhing token");
        try {
          const response = await callRefreshToken(refreshToken);
          if (response && response.data.access) {
            originalRequest.headers["Authorization"] =
              "Bearer " + response.data.access;
            return axios(originalRequest);
          }
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default axiosTokenInterceptorInstance;
