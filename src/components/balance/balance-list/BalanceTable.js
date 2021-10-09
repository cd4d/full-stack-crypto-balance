import { React, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import CurrencyContext from "../../../store/currency-context";
import { formatCurrency } from "../../../utils/utils";
import { DELETE_COIN, UPDATE_QUANTITY } from "../../../store/balance-functions";
import { balanceActions } from "../../../store/balance-slice";
import {
  updateQuantityRemoteAction,
  deleteCoinRemoteAction,
} from "../../../store/balance-async-thunks";
export default function BalanceTable(props) {
  const pageSize = 5;
  const balance = useSelector((state) => state.balanceReducer.balance);
  const user = useSelector((state) => state.userReducer);
  const isBalanceLoading = useSelector(
    (state) => state.uiReducer.isLoading.rates
  );
  const dispatch = useDispatch();
  const currencyCtx = useContext(CurrencyContext);
  const error = useSelector((state) => state.uiReducer.error.rates);
  function deleteButton(coinClicked) {
    return (
      <Button onClick={() => onDeleteCoin(coinClicked)} icon="pi pi-times" />
    );
  }
function sortBalanceByValue(){
  return [...balance].sort((a,b) => b.value - a.value)
}
  function onDeleteCoin(coin) {
    if (user.id) {
      dispatch(
        deleteCoinRemoteAction({
          entryId: coin.entryId,
        })
      );
    } else {
      dispatch(
        balanceActions.updateLocalBalance({
          entryId: coin.entryId,
          changeRequested: DELETE_COIN,
        })
      );
    }
  }
  function onEditorQuantityChange(tableProps, event) {
    if (user.id) {
      dispatch(
        updateQuantityRemoteAction({
          entryId: tableProps.rowData.entryId,
          quantity: +event.target.value,
        })
      );
    } else {
      dispatch(
        balanceActions.updateLocalBalance({
          entryId: tableProps.rowData.entryId,
          quantity: +event.target.value,
          changeRequested: UPDATE_QUANTITY,
        })
      );
    }
  }

  const quantityEditor = (tableProps) => {
    return (
      <InputNumber
        value={tableProps.rowData["quantity"]}
        onValueChange={(event) => onEditorQuantityChange(tableProps, event)}
        min={0}
        className="quantity-input"
        showButtons
        mode="decimal"
        minFractionDigits={1}
        maxFractionDigits={2}
      />
    );
  };
  return (
    <div>
      <div className="card">
        <DataTable
          lazy={false}
          loading={isBalanceLoading}
          value={sortBalanceByValue()}
          autoLayout={false}
          paginator={true}
          rows={pageSize}
          // bugged when logged in
          // sortField="value"
          // sortOrder={-1}
          className="balance-list-table"
          editing={true}
        >
          <Column field="name" header="Name" sortable={false}></Column>
          <Column
            field="ticker"
            header="Ticker"
            sortable={false}
            className="d-none d-sm-none d-lg-table-cell"
          ></Column>
          <Column
            field="rate"
            header="Rate"
            body={(coin) =>
              formatCurrency(coin.rate, currencyCtx ? currencyCtx : "usd")
            }
            sortable={false}
            className={error ? "table-text-error" : ""}
          ></Column>
          <Column
            field="quantity"
            header="Quantity"
            sortable={false}
            editor={(props) => quantityEditor(props)}
          ></Column>
          <Column
            field="value"
            header="Value"
            sortable={false}
            body={(coin) =>
              formatCurrency(coin.value, currencyCtx ? currencyCtx : "usd")
            }
          ></Column>
          <Column
            body={(coinClicked) => deleteButton(coinClicked)}
            header="Delete"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}


