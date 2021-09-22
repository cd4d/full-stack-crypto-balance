import { React, useContext } from "react";

import AddCoin from "./add-coin/AddCoin";
import RefreshRatesBtn from "./add-coin/RefreshRatesBtn";
import BalanceTable from "./BalanceTable";
import CurrencyContext from "../../../store/currency-context";
import "./balance-list.css";
import { useSelector, useDispatch } from "react-redux";
import {
  balanceActions,
  fetchAndCalculate,
} from "../../../store/balance-slice";
import EmptyBalance from "../EmptyBalance";

export default function BalanceList() {
  const currencyCtx = useContext(CurrencyContext);

  const isBalanceLoading = useSelector(
    (state) => state.uiReducer.isLoading.rates
  );
  const error = useSelector((state) => state.uiReducer.error.rates);
  const balance = useSelector((state) => state.balanceReducer.balance);
  const addCoinInputDisplayed = useSelector(
    (state) => state.uiReducer.addCoinDisplayed
  );
  const dispatch = useDispatch();

  
  function updateBalance(newBalance) {
    console.log("newBalance", newBalance);
    dispatch(balanceActions.updateBalance(newBalance));

    console.log("updating balance");
    dispatch(balanceActions.calculateBalance());
  }

  return (
    <>
      {isBalanceLoading && (
        <div>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      ) 
      }
      {/* Alert message if fetching rates unsuccessful  */}
      {error && (
        <div className="alert alert-danger">
          Error fetching rates. Using default rates instead.
        </div>
      )}

      {balance.length ? (
        <BalanceTable
          onUpdateBalance={(newBalance) => updateBalance(newBalance)}
        />
      ) : (
        <EmptyBalance />
      )}
    </>
  );
}
