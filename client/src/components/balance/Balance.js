import { React, useEffect, useContext, useRef } from "react";
import BalanceList from "./balance-list/BalanceList";
import EmptyBalance from "../balance/EmptyBalance";

import BalanceChart from "./balance-chart/BalanceChart";
import BalanceNews from "./balance-news/BalanceNews";
import Login from "../user/Login";
import { useSelector, useDispatch } from "react-redux";
import CurrencyContext from "../../store/currency-context";
import {  fetchAndCalculate } from "../../store/balance-slice";
import { fetchRemoteBalanceAction } from "../../store/balance-async-thunks";
import AddCoin from "./balance-list/add-coin/AddCoin";
export default function Balance() {
  const balance = useSelector((state) => state.balanceReducer.balance);
  const user = useSelector((state) => state.userReducer);
  const currencyCtx = useContext(CurrencyContext);

  // refs to avoid including dependencies in useEffect
  const currencyRef = useRef(currencyCtx);

  const dispatch = useDispatch();

  // recalculate values when balance or currency changes
  useEffect(() => {
    dispatch(
      fetchAndCalculate(
         currencyCtx
      )
    );
  }, [balance,currencyCtx, dispatch]);



  // fetch user balance and calculate when user logs in
  useEffect(() => {
    async function fetchUserBalance() {
      return dispatch(fetchRemoteBalanceAction());
    }
    if (user.accessToken) {
      fetchUserBalance()
        .then((userBalance) => userBalance.payload.map((coin) => coin.name))
        .then((coinsNames) =>
          dispatch(
            fetchAndCalculate(
               currencyRef.current
            )
          )
        )
        .catch((err) => {
          return(err)
        });
    }
  }, [user.accessToken, dispatch]);



  return (
    <div className="container">
      <Login />
      <div className="row">
        <AddCoin balance={balance} />
        {balance.length ? (
          <>
            <div className="col-md-8 col-sm-12">
              <BalanceList></BalanceList>
            </div>
            <div className="col-md-4 col-sm-12 ">
              <BalanceChart></BalanceChart>

              <BalanceNews></BalanceNews>
            </div>
          </>
        ) : (
          <EmptyBalance />
        )}
      </div>
    </div>
  );
}
