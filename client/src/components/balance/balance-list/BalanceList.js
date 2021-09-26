import { React } from "react";
import BalanceTable from "./BalanceTable";
import "./balance-list.css";
import { useSelector, useDispatch } from "react-redux";
import { balanceActions } from "../../../store/balance-slice";
import { updateRemoteBalanceAction } from "../../../store/balance-async-thunks";
import EmptyBalance from "../EmptyBalance";

export default function BalanceList() {
  const isBalanceLoading = useSelector(
    (state) => state.uiReducer.isLoading.rates
  );
  const error = useSelector((state) => state.uiReducer.error.rates);
  const balance = useSelector((state) => state.balanceReducer.balance);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  // updatedBalance, entryId,quantity
  function onUpdateBalance(args) {
    console.log("args updatedBalance", args);
    console.log("updatedBalance", args.updatedBalance);
    console.log("entryId", args.entryId);
    dispatch(balanceActions.updateLocalBalance(args.updatedBalance));
    if (user.id)
      dispatch(
        updateRemoteBalanceAction({
          entryId: args.entryId,
          quantity: args.quantity,
        })
      );
    console.log("updating balance");
    dispatch(balanceActions.calculateLocalBalance());
  }

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

      {balance.length ? (
        <BalanceTable
          onUpdateBalance={(newBalance, entryId) =>
            onUpdateBalance(newBalance, entryId)
          }
        />
      ) : (
        <EmptyBalance />
      )}
    </>
  );
}
