import axios from "axios";

const DB_URL = process.env.REACT_APP_DB_URL;
const DB_AUTH = DB_URL + "dj-rest-auth/";

let accessToken = null;
export function setAccessTokenUser(token) {
  accessToken = token;
}

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    //  "Access-Control-Allow-Origin ": "*",
  },
  // withCredentials: true,
});

export async function login(credentials) {
  try {
    const response = await instance.post(DB_AUTH + "login/", {
      username: credentials.username,
      password: credentials.password,
    });
    console.log("login response", await response);

    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      let err = new Error();
      err.message = `An error has occurred: ${response.status}`;
      err.status = response.status;
      throw err;
    }
  } catch (error) {
    return error;
  }
}
export async function register(credentials) {
  try {
    const response = await instance.post(DB_AUTH + "registration/", {
      username: credentials.username,
      password1: credentials.password1,
      password2: credentials.password2,
    });
    console.log("register response", await response);

    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      let err = new Error();
      err.message = `An error has occurred: ${response.status}`;
      err.status = response.status;
      throw err;
    }
  } catch (error) {
    return error;
  }
}

export async function logout() {
  try {
    const response = await instance.post(DB_AUTH + "logout/");
    if (response.status >= 200 && response.status <= 299) {
      return response;
    }
  } catch (error) {
    return error;
  }
}
export async function callRefreshToken(refreshToken) {
  console.log("refresh token", refreshToken);
  try {
    const response = await instance.post(DB_AUTH + "token/refresh/", {
      refresh: refreshToken,
    });
    if (response.status >= 200 && response.status <= 299) {
      console.log("refreshed", response);
      return response;
    }
  } catch (error) {
    return error;
  }
}

export async function getUser(id) {
  try {
    const response = await axios.get(DB_URL + "users/" + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status >= 200 && response.status <= 299) {
      return response;
    }
  } catch (error) {
    return error;
  }
}
