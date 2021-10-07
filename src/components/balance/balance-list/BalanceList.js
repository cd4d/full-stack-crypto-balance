import { React } from "react";
import BalanceTable from "./BalanceTable";
import "./balance-list.css";
import { useSelector} from "react-redux";

import EmptyBalance from "../EmptyBalance";

export default function BalanceList() {
  const isBalanceLoading = useSelector(
    (state) => state.uiReducer.isLoading.rates
  );
  const error = useSelector((state) => state.uiReducer.error.rates);
  const balance = useSelector((state) => state.balanceReducer.balance);


  return (
    <>
      {isBalanceLoading && (
        <div>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      )}
      {/* Alert message if fetching rates unsuccessful  */}
      {error && (
        <div className="alert alert-danger">
          Error fetching rates. Using default rates instead.
        </div>
      )}

      {balance.length ? <BalanceTable /> : <EmptyBalance />}
    </>
  );
}
