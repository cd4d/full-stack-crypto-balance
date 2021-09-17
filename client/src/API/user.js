const DB_URL = process.env.REACT_APP_DB_URL;
const DB_AUTH = DB_URL + "dj-rest-auth/";
// const DB_URL_SSL = process.env.REACT_APP_DB_URL_SSL;
// const DB_AUTH_SSL = DB_URL_SSL + "dj-rest-auth/";

export async function login(credentials) {
  try {
    const response = await fetch(DB_AUTH + "login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });
    if (!response.ok) {
      let err = new Error();
      err.message = `An error has occurred: ${response.status}`;
      err.status = response.status;
      throw err;
    }
    if (response.status >= 200 && response.status <= 299) {
      console.log("connected", response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function logout() {
  try {
    const response = await fetch(DB_AUTH + "logout/", { method: "POST" });
    if (response.status >= 200 && response.status <= 299) {
      console.log("logged out", response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function refresh(refreshToken) {
  console.log("refresh token", refreshToken);
  try {
    const response = await fetch(DB_AUTH + "token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });
    if (response.status >= 200 && response.status <= 299) {
      console.log("refreshed", response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
