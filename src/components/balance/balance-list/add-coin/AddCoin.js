import { React, useEffect, useRef, useCallback, useContext } from "react";
import { InputText } from "primereact/inputtext";

// coins list for adding coin search function
import coinsListFile from "../../../../coins-list-sorted-with-id.json";
import { fetchRates } from "../../../../API/API-calls";
import CurrencyContext from "../../../../store/currency-context";
import { useSelector, useDispatch } from "react-redux";
import { addCoinActions } from "../../../../store/addCoin-slice";
import { uiActions } from "../../../../store/ui-slice";
import { fetchAndCalculate } from "../../../../store/balance-slice";
import { balanceActions } from "../../../../store/balance-slice";
import { ADD_COIN } from "../../../../store/balance-functions";

import RefreshRatesBtn from "./RefreshRatesBtn";
import { addCoinRemoteAction } from "../../../../store/balance-async-thunks";

export default function AddCoin({ balance }) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const currencyCtx = useContext(CurrencyContext);
  const addCoinState = useSelector((state) => state.addCoinReducer);
  const addCoinInputDisplayed = useSelector(
    (state) => state.uiReducer.addCoinDisplayed
  );
  const error = useSelector((state) => state.uiReducer.error.addCoin);
  const user = useSelector((state) => state.userReducer);

  //format currency: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  const formatCurrency = (value, inputCurrency) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      currency: inputCurrency ? inputCurrency : "USD",
    });
  };
  function addCoinLocal(newBalance) {
    dispatch(
      balanceActions.updateLocalBalance({
        newBalance,
        changeRequested: ADD_COIN,
      })
    );
  }
  function onRefreshRates() {
    // triggerRatesUpdate();
    const coinsSlugs = balance.map((coin) => coin.slug);
    dispatch(fetchAndCalculate(coinsSlugs, currencyCtx));
  }
  const searchCoin = useCallback((enteredInput) => {
    let result = [];
    if (!enteredInput.trim()) {
      return [];
    }
    coinsListFile.map((coin) => {
      if (coin && enteredInput.trim().length > 1) {
        if (coin.slug && coin.slug.includes(enteredInput.toLowerCase())) {
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
      // Update input field
      if (property === "slug") {
        const coinAlreadyInBalance = balance.find(
          (coin) => coin.slug === input.slug
        );
        if (!coinAlreadyInBalance) {
          // filling the input with selected value using ref so debounce hook not triggered
          inputRef.current.value = input.slug;
          dispatch(
            addCoinActions.setStateReducer({
              type: "replaceData",
              field: "selectedCoin",
              data: input,
            })
          );

          // empty result array
          dispatch(
            addCoinActions.setStateReducer({
              type: "replaceData",
              field: "resultSearch",
              data: [],
            })
          );
          dispatch(
            uiActions.clearError({
              type: "addCoin",
            })
          );
        } else {
          dispatch(
            uiActions.changeError({
              type: "addCoin",
              value: "Coin already in balance.",
            })
          );
        }
      } else {
        dispatch(
          addCoinActions.setStateReducer({
            type: "changeProperty",
            field: "selectedCoin",
            property: property,
            data: input,
          })
        );
      }
    },
    [dispatch, balance]
  );

  // searching coin name from local coin list
  // debounce hook
  useEffect(() => {
    const timer = setTimeout(() => {
      // executes search function only every 500ms
      const results = searchCoin(addCoinState.searchInput);
      dispatch(
        addCoinActions.setStateReducer({
          type: "replaceData",
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
      const coinSearched = addCoinState.selectedCoin.slug.toLowerCase();
      const response = await fetchRates([coinSearched], currencyCtx);

      //ex. {'cardano': {'usd': 1.31 }}
      if (Object.keys(response).length > 0) {
        currentRate = response[coinSearched][currencyCtx];
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
    if (addCoinState.selectedCoin.slug) {
      getRates();
    }
  }, [addCoinState.selectedCoin.slug, currencyCtx, dispatch, inputCoin]);

  function toggleAddCoin() {
    dispatch(uiActions.toggleAddCoinDisplayed());
  }

  function onAddCoin(coin) {
    if (coin && coin.slug && coin.quantity && coin.id) {
      if (user.id) {
        dispatch(
          addCoinRemoteAction({ quantity: coin.quantity, coinId: coin.id }),
          fetchAndCalculate(currencyCtx)
        );
      } else {
        let newCoin = {
          coinId: coin.id,
          name: coin.name,
          quantity: coin.quantity,
          rate: coin.rate,
          ticker: coin.symbol.toUpperCase(),
          slug: coin.slug,
          image:coin.image
        };
        const updatedBalance = [...balance, newCoin];
        addCoinLocal(updatedBalance);
      }
      closeInput();
    }
  }

  function setSearchCoin(e) {
    //setSearchInput(e);
    dispatch(
      addCoinActions.setStateReducer({
        type: "replaceData",
        field: "searchInput",
        data: e,
      })
    );
  }
  function closeInput() {
    //setSearchInput('');
    dispatch(
      addCoinActions.setStateReducer({
        type: "replaceData",
        field: "searchInput",
        data: "",
      })
    );
    // setSelectedCoin({ id: '', quantity: 0 });
    dispatch(
      addCoinActions.setStateReducer({
        type: "replaceData",
        field: "selectedCoin",
        data: { id: "", quantity: 0 },
      })
    );
    dispatch(
      uiActions.clearError({
        type: "addCoin",
      })
    );
    toggleAddCoin();
  }

  return (
    <>
      {addCoinInputDisplayed ? (
        <div className="row mb-2">
          <h6>
            Add coin: {!error && addCoinState.selectedCoin.slug}{" "}
            {addCoinState.selectedCoin.quantity > 0 &&
              addCoinState.selectedCoin.rate &&
              formatCurrency(
                addCoinState.selectedCoin.rate *
                  +addCoinState.selectedCoin.quantity
              )}
            {error && <span className="text-danger">{error}</span>}
          </h6>
          <div className="col-md-3">
            <div>
              {/* Input name of coin */}
              <InputText
                ref={inputRef}
                id="search-box"
                placeholder="Start typing (3 letters)"
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
                        <span onClick={() => inputCoin(coin, "slug")}>
                          {coin.slug}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
          {/* Input quantity of coin, disabled if no coin selected */}
          <div className="col-md-2 me-4 ps-0">
            <div>
              <InputText
                disabled={!addCoinState.selectedCoin.id}
                type="number"
                min={0}
                id="add-coin-input-quantity"
                placeholder="Coin quantity"
                onChange={(e) => inputCoin(e.target.value, "quantity")}
              />
            </div>
          </div>

          <div className="col pt-2">
            {/* confirm and add coin */}
            {addCoinState.selectedCoin.id &&
              addCoinState.selectedCoin.quantity && (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => onAddCoin(addCoinState.selectedCoin)}
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
