import coinsList from "../coins-list-sorted.json";
export function formatCurrency(value, inputCurrency) {
  if (value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      currency: inputCurrency ? inputCurrency : "USD",
    });
  }
}

function sortBalanceById(balance) {
  // sort by alphabetical order
  return balance.sort((a, b) => {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1; // nameA comes first
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0; // names are equal
  });
}

export function getIcons(balance) {
  // get images

  balance = sortBalanceById(balance);
  if (coinsList && coinsList.length) {
    //let count = 0;
    let i = 0;
    //console.log(balance);

    for (let coin of coinsList) {
      // loop through all coins supported
      while (i < balance.length) {
        // check local balance
        if (
          coin.id &&
          balance[i].name.toLowerCase() === coin.id.toLowerCase()
        ) {
          balance[i].image = coin.image;
          // increment both coins list and local balance loops
          //count++;
          i++;
          //console.log(count, i, coin.id);
          break;
        } else {
          // increment only coins list
          //count++;
          break;
        }
      }
      // break main loop (coins list)
      if (i >= balance.length) {
        break;
      }
    }
  }
}
