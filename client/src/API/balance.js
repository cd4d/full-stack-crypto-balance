const DB_URL = process.env.REACT_APP_DB_URL;
// const DB_URL_SSL = process.env.REACT_APP_DB_URL_SSL;


export async function fetchBalance(access_token) {
  try {
    const response = await fetch(DB_URL + "balances/", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
    });
    if (!response.ok) {
      let err = new Error();
      err.message = `An error has occurred: ${response.status}`;
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
