import axios from 'axios'

const DB_URL = process.env.REACT_APP_DB_URL;
const DB_AUTH = DB_URL + "dj-rest-auth/";


const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});



export async function login(credentials) {
  try {
    const response = await instance.post(DB_AUTH + "login/", {
      username: credentials.username,
      password: credentials.password,
    });
    if (response.statusText !== 'OK') {
      let err = new Error();
      err.message = `An error has occurred: ${response.status}`;
      err.status = response.status;
      throw err;
    }
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {

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
