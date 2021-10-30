import React, { useEffect } from "react";
import { Chart } from "primereact/chart";
import { useSelector, useDispatch } from "react-redux";
import { balanceActions } from "../../../store/balance-slice";
const BalanceChart = React.memo(() => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balanceReducer.balance);
  const isBalanceLoading = useSelector(
    (state) => state.uiReducer.isLoading.calculateBalance
  );
  const formattedData = useSelector(
    (state) => state.balanceReducer.formattedData
  );

  useEffect(() => {
    dispatch(balanceActions.formatLocalData());
  }, [balance, dispatch]);

  const chartOptions = {
    responsive: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#495057",
        },
      },
    },
  };

  return (
    <>
      {isBalanceLoading && (
        <div>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      )}
      {!isBalanceLoading && (
        <>
          <h4>Total: {formatCurrency(total, currencyCtx)}</h4>
          <Chart
            type="doughnut"
            // need to pass a copy
            data={{ ...formattedData }}
            options={chartOptions}
          />
        </>
      )}
    </>
  );
});
export default BalanceChart;
