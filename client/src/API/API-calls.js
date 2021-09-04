// fetch rates from list of coins

export async function fetchRates(coinsList, currency = "usd") {
  const formattedCoinListForAPI = coinsList.join("%2C");
  // console.log("fetching rates for: ", coinsList);
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=" +
        formattedCoinListForAPI +
        "&vs_currencies=" +
        currency.toLowerCase()
    );
    //
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    if (response.status >= 200 && response.status <= 299) {
      // console.log("got rates: ", await response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchNews(coinsList) {
  console.log(coinsList);
  const coinsListFormatted = coinsList.join("%2C");
  const newsDataURL = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=${coinsListFormatted}&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`;
  try {
    const response = await fetch(newsDataURL, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    });
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      console.log(message);
      throw new Error(message);
    }
    if (response.status >= 200 && response.status <= 299) {
      console.log("response: ", response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return { error: true, errorData: error };
  }
}
