// fetch rates from list of coins
import axios from "axios";
export async function fetchRates(coinsNames, currency = "usd") {
  const formattedCoinListForAPI = coinsNames.join("%2C");
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=" +
      formattedCoinListForAPI +
      "&vs_currencies=" +
      currency.toLowerCase()
    );
    //

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchNews(coinsNames) {
  const coinsNamesFormatted = coinsNames.join("%2C");
  const newsDataURL = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=${coinsNamesFormatted}&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`;
  try {
    const response = await axios.get(newsDataURL, {
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    });

    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {

      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
  } catch (error) {
    return {  ...error.response, message: error.message };
  }
}
