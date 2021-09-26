import { React, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cloneDeep } from "lodash";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import CurrencyContext from "../../../store/currency-context";
import { formatCurrency } from "../../../utils/utils";
import { DELETE_COIN } from "../../../store/balance-functions";
import {balanceActions} from "../../../store/balance-slice"
export default function BalanceTable(props) {
  const pageSize = 5;
  const balance = useSelector((state) => state.balanceReducer.balance);
  const isBalanceLoading = useSelector(
    (state) => state.uiReducer.isLoading.rates
  );
  const dispatch = useDispatch()
  const currencyCtx = useContext(CurrencyContext);
  const error = useSelector((state) => state.uiReducer.error.rates);
  function deleteButton(coinClicked) {
    return (
      <Button onClick={() => onDeleteCoin(coinClicked)} icon="pi pi-times" />
    );
  }

  function onDeleteCoin(coin) {
    dispatch(balanceActions.updateLocalBalance({
      data: { entryId: coin.entryId },
      changeRequested: DELETE_COIN,
    }))
  }
  function onEditorQuantityChange(tableProps, event) {
    // let updatedBalance = [...tableProps.value] does NOT work, need deep cloning
    let updatedBalance = cloneDeep(tableProps.value);
    updatedBalance[tableProps.rowIndex][tableProps.field] = +event.target.value;
    // onUpdateBalance({
    //   updatedBalance: updatedBalance,
    //   entryId: tableProps.rowData?.entryId,
    //   quantity: +event.target.value,
    // });
  }
  const quantityEditor = (tableProps) => {
    return (
      <input
        type="number"
        value={tableProps.rowData["quantity"]}
        onChange={(event) => onEditorQuantityChange(tableProps, event)}
        min={0}
        className="quantity-input"
      />
    );
  };
  return (
    <div>
      <div className="card">
        <DataTable
          lazy={false}
          loading={isBalanceLoading}
          value={balance}
          autoLayout={false}
          paginator={false}
          rows={pageSize}
          sortField="value"
          sortOrder={-1}
          className="balance-list-table"
          editing={true}
        >
          <Column field="name" header="Name" sortable></Column>
          <Column
            field="ticker"
            header="ticker"
            sortable
            className="d-none d-sm-none d-lg-table-cell"
          ></Column>
          <Column
            field="rate"
            header="Rate"
            body={(coin) =>
              formatCurrency(coin.rate, currencyCtx ? currencyCtx : "usd")
            }
            sortable
            className={error ? "table-text-error" : ""}
          ></Column>
          <Column
            field="quantity"
            header="quantity"
            sortable
            editor={(props) => quantityEditor(props)}
          ></Column>
          <Column
            field="value"
            header="Value"
            sortable
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
