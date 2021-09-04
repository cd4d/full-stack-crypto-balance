import { React, useEffect, useContext } from "react";
import BalanceList from "./balance-list/BalanceList";
import BalanceChart from "./balance-chart/BalanceChart";
import BalanceNews from "./balance-news/BalanceNews";
import { useSelector, useDispatch } from "react-redux";
import CurrencyContext from "../../store/currency-context";
import { balanceActions, fetchAndCalculate } from "../../store/balance-slice";

export default function Balance() {
  const currencyCtx = useContext(CurrencyContext);

  /**** REDUX ****/
  const balance = useSelector((state) => state.balanceReducer.balance);
  const dispatch = useDispatch();
  // console.log(balance);

  useEffect(() => {
    dispatch(balanceActions.calculateBalance());
  }, [dispatch]);

  useEffect(() => {
    const coinsList = balance.map((coin) => coin.name);

    dispatch(
      fetchAndCalculate({
        coinsList,
        currency: currencyCtx,
        // updateBalanceAfterFulfill: true,
      })
    );

    // disabling coinsList check to avoir infinite lop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyCtx, dispatch]);

  const updateBalance = (newBalance) => {
    // console.log(newBalance);
    dispatch(balanceActions.updateBalance(newBalance));

    // console.log("updating balance");
    dispatch(balanceActions.calculateBalance());
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 col-sm-12">
          <BalanceList
            onUpdateBalance={(newBalance) => updateBalance(newBalance)}
          ></BalanceList>
        </div>
        <div className="col-md-5 col-sm-12 ">
          <BalanceChart></BalanceChart>

          <BalanceNews></BalanceNews>
        </div>
      </div>
    </div>
  );
}
