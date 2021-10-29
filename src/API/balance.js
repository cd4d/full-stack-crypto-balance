import axios from "axios";
import { callRefreshToken } from "./user";
import axiosApiInstance from "./interceptors";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// used by tokenMiddleware to set token


export async function fetchBalance() {
  try {
    const response = await axiosApiInstance.get(`${BACKEND_URL}balances/`);
    if (response.statusText !== "OK") {
      let err = new Error();
      err.message = `An error has occurred: ${response.data}`;
      err.status = response.status;

      throw err;
    }
    if (response.status >= 200 && response.status <= 299) {
      return response;
    }
  } catch (error) {
    return error;
  }
}
export async function updateQuantity(entryId, quantity) {
  try {
    if (isNaN(entryId) || isNaN(quantity)) throw new Error("Invalid data");
    const response = await axiosApiInstance.put(
      `${BACKEND_URL}balances/${entryId}/`,
      {
        quantity,
      }
     
    );

    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      throw new Error({
        message: `An error has occurred: ${response.data}`,
        status: response.status,
      });
    }
  } catch (error) {
    return error;
  }
}
// add coin, must be: {coinId: int, quantity: int}
export async function addCoin(coin) {
  try {
    const response = await axiosApiInstance.post(
      `${BACKEND_URL}balances/`,
      coin
    );

    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      throw new Error({
        message: `An error has occurred: ${response.data}`,
        status: response.status,
      });
    }
  } catch (error) {
    return error.message;
  }
}
export async function deleteCoin(entryId) {
  try {
    if (isNaN(entryId)) throw new Error("Invalid data");
    const response = await axiosApiInstance.delete(
      `${BACKEND_URL}balances/${entryId}/`
    );
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      throw new Error({
        message: `An error has occurred: ${response.data}`,
        status: response.status,
      });
    }
  } catch (error) {
    return error;
  }
}
