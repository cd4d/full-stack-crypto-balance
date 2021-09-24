import { React, useEffect, useRef, useCallback, useContext } from "react";
import { InputText } from "primereact/inputtext";

// coins list for adding coin search function
import coinsList from "../../../../coins-list-sorted.json";
import { fetchRates } from "../../../../API/API-calls";
import CurrencyContext from "../../../../store/currency-context";
import { useSelector, useDispatch } from "react-redux";
import { addCoinActions } from "../../../../store/addCoin-slice";
import { uiActions } from "../../../../store/ui-slice";
import { fetchAndCalculate } from "../../../../store/balance-slice";
import RefreshRatesBtn from "./RefreshRatesBtn";

export default function AddCoin({ balance, updateBalance }) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const currencyCtx = useContext(CurrencyContext);
  const addCoinState = useSelector((state) => state.addCoinReducer);
  const addCoinInputDisplayed = useSelector(
    (state) => state.uiReducer.addCoinDisplayed
  );
  const error = useSelector((state) => state.uiReducer.error.addCoin);

  //format currency: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  const formatCurrency = (value, inputCurrency) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      currency: inputCurrency ? inputCurrency : "USD",
    });
  };
  function onRefreshRates() {
    // triggerRatesUpdate();
    const coinsList = balance.map((coin) => coin.name);
    dispatch(fetchAndCalculate({ coinsList, currency: currencyCtx }));
  }
  const searchCoin = useCallback((enteredInput) => {
    // console.log('searchCoin input: ', enteredInput);
    let result = [];
    if (!enteredInput.trim()) {
      return [];
    }
    coinsList.map((coin) => {
      if (coin && enteredInput.trim().length > 1) {
        if (coin.id && coin.id.includes(enteredInput.toLowerCase())) {
          result.push(coin);
        }
        if (coin.symbol && coin.symbol.includes(enteredInput.toLowerCase())) {
          result.push(coin);
        }
      }
      return null;
    });
    return result;
  }, []);
  const inputCoin = useCallback(
    (input, property) => {
      // convert id to lowercase and update input field
      if (property === "id") {
        // filling the input with selected value using ref so debounce hook not triggered
        inputRef.current.value = input.id;
        dispatch(
          addCoinActions.setStateReducer({
            type: "replaceState",
            field: "selectedCoin",
            data: input,
          })
        );

        // empty result array
        dispatch(
          addCoinActions.setStateReducer({
            type: "replaceState",
            field: "resultSearch",
            data: [],
          })
        );
      } else {
        dispatch(
          addCoinActions.setStateReducer({
            type: "replaceProperty",
            field: "selectedCoin",
            property: property,
            data: input,
          })
        );
      }
    },
    [dispatch]
  );

  // searching coin name from local coin list
  // debounce hook
  useEffect(() => {
    const timer = setTimeout(() => {
      // executes search function only every 500ms
      const results = searchCoin(addCoinState.searchInput);
      dispatch(
        addCoinActions.setStateReducer({
          type: "replaceState",
          field: "resultSearch",
          data: results,
        })
      );
    }, 500);
    return () => {
      // resets the timer, only last timer active (debouncing)
      clearTimeout(timer);
    };
  }, [addCoinState.searchInput, dispatch, searchCoin]);

  // fetching rate of new coin
  useEffect(() => {
    async function getRates() {
      let currentRate = 1;
      const coinSearched = addCoinState.selectedCoin.name.toLowerCase()
      const response = await fetchRates(
        [coinSearched],
        currencyCtx
      );

      //ex. {'cardano': {'usd': 1.31 }}
      if (Object.keys(response).length > 0) {
        currentRate = response[coinSearched][
          currencyCtx
        ];
      } else {
        dispatch(
          uiActions.changeError({
            type: "addCoin",
            value: "Cannot fetch rate of coin, using $1 rate.",
          })
        );
      }
      inputCoin(+currentRate, "rate");
    }
    // prevents launching at first render
    if (addCoinState.selectedCoin.name) {
      getRates();
    }
  }, [addCoinState.selectedCoin.name, currencyCtx, dispatch, inputCoin]);

  function toggleAddCoin() {
    dispatch(uiActions.toggleAddCoinDisplayed());
  }

  function addCoin(coin) {
    if (coin && coin.id && coin.amount) {
      // Need to destructure balance to update list
      const updatedBalance = [...balance, coin];
      console.log("updating balance: ", updatedBalance);
      updateBalance(updatedBalance);
      closeInput();
    }
  }

  function setSearchCoin(e) {
    //setSearchInput(e);
    dispatch(
      addCoinActions.setStateReducer({
        type: "replaceState",
        field: "searchInput",
        data: e,
      })
    );
  }
  function closeInput() {
    //setSearchInput('');
    dispatch(
      addCoinActions.setStateReducer({
        type: "replaceState",
        field: "searchInput",
        data: "",
      })
    );
    // setSelectedCoin({ id: '', amount: 0 });
    dispatch(
      addCoinActions.setStateReducer({
        type: "replaceState",
        field: "selectedCoin",
        data: { id: "", amount: 0 },
      })
    );
    dispatch(
      uiActions.changeError({
        type: "addCoin",
        value: null,
      })
    );
    toggleAddCoin();
  }

  return (
    <>
      {addCoinInputDisplayed ? (
        <div className="row mt-2 mb-2">
          <h6>
            Add coin: {!error && addCoinState.selectedCoin.name}{" "}
            {addCoinState.selectedCoin.amount > 0 &&
              addCoinState.selectedCoin.rate &&
              formatCurrency(
                addCoinState.selectedCoin.rate *
                  +addCoinState.selectedCoin.amount
              )}
            {error && <span className="text-danger">{error}</span>}
          </h6>
          <div className="col">
            <div>
              {/* Add coin id input */}
              <InputText
                ref={inputRef}
                id="search-box"
                placeholder="Coin name"
                onChange={(e) => {
                  setSearchCoin(e.target.value);
                }}
              />
              {/* List of matching coins */}
              {addCoinState.resultSearch &&
                addCoinState.resultSearch.length > 0 && (
                  <ul className="list-group">
                    {addCoinState.resultSearch.map((coin, idx) => (
                      <li
                        key={idx}
                        className="list-group-item list-group-item-action"
                      >
                        {/* omitting arrow notation causes render bug */}
                        <span onClick={() => inputCoin(coin, "id")}>
                          {coin.id}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
          {/* Input amount of coin, disabled if no coin selected */}
          <div className="col ps-0">
            <div>
              <InputText
                disabled={!addCoinState.selectedCoin.id}
                type="number"
                min={0}
                id="add-coin-input-amount"
                placeholder="Coin amount"
                onChange={(e) => inputCoin(e.target.value, "amount")}
              />
            </div>
          </div>

          <div className="col pt-2">
            {/* confirm and add coin */}
            {addCoinState.selectedCoin.id && addCoinState.selectedCoin.amount && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => addCoin(addCoinState.selectedCoin)}
              >
                <span className="pi pi-check"></span>
              </span>
            )}
            {/* close and cancel */}
            <span style={{ cursor: "pointer" }} onClick={closeInput}>
              <span className="pi pi-times"></span>
            </span>
          </div>
        </div>
      ) : (
        <div className="col-md-8">
          {" "}
          <button
            // label='Add coin'
            onClick={toggleAddCoin}
            type="button"
            className="btn btn-primary mt-1 mb-2 btn-sm"
          >
            <i className="pi pi-plus" aria-hidden="true"></i>
            <span className="d-sm-none d-lg-inline"> Add coin</span>
          </button>
          {balance.length > 0 && (
            <RefreshRatesBtn onRefreshRates={onRefreshRates} />
          )}
        </div>
      )}
    </>
  );
}
