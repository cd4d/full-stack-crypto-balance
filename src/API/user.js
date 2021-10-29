import axios from "axios";
import axiosApiInstance from "./interceptors";

// https://intense-bayou-22244.herokuapp.com/undefineddj-rest-auth/registration/
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DB_AUTH = BACKEND_URL + "dj-rest-auth/";

export async function login(credentials) {
  try {
    const response = await axios.post(DB_AUTH + "login/", {
      username: credentials.username,
      password: credentials.password,
    });

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
    const response = await axios.post(DB_AUTH + "registration/", {
      username: credentials.username,
      password1: credentials.password1,
      password2: credentials.password2,
    });

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
    const response = await axios.post(DB_AUTH + "logout/");
    if (response.status >= 200 && response.status <= 299) {
      return response;
    }
  } catch (error) {
    return error;
  }
}
export async function callRefreshToken(refreshToken) {
  try {
    const response = await axios.post(DB_AUTH + "token/refresh/", {
      refresh: refreshToken,
    });
    if (response.status >= 200 && response.status <= 299) {
      return response;
    }
  } catch (error) {
    return error;
  }
}

export async function getUser(id) {
  try {
    console.log("getting user", id);
    const response = await axiosApiInstance.get(BACKEND_URL + "users/" + id);
    console.log("get user response", response);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
