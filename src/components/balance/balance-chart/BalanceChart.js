import React, { useContext, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useSelector, useDispatch } from "react-redux";
import { balanceActions } from "../../../store/balance-slice";
import { formatCurrency } from "../../../utils/utils";
import CurrencyContext from "../../../store/currency-context";
const BalanceChart = React.memo(() => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balanceReducer.balance);
  const isBalanceLoading = useSelector(
    (state) => state.uiReducer.isLoading.calculateBalance
  );
  const formattedData = useSelector(
    (state) => state.balanceReducer.formattedData
  );
  const currencyCtx = useContext(CurrencyContext);
  const total = useSelector((state) => state.balanceReducer.total);

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
      {!!balance.length && (
        <>
          <h4>Total: {formatCurrency(total, currencyCtx)}</h4>
          <Chart
            type="doughnut"
            // need to pass a copy
            data={{ ...formattedData }}
            options={chartOptions}
            style={isBalanceLoading ? { display: "none" } : {}}
          />
        </>
      )}
    </>
  );
});
export default BalanceChart;
