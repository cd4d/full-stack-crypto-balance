import { React, useEffect, useContext, useRef } from "react";
import jwt_decode from "jwt-decode";
import BalanceList from "./balance-list/BalanceList";
import EmptyBalance from "../balance/EmptyBalance";

import BalanceChart from "./balance-chart/BalanceChart";
import BalanceNews from "./balance-news/BalanceNews";
import Login from "../user/Login";
import Register from "../user/Register";
import { useSelector, useDispatch } from "react-redux";
import CurrencyContext from "../../store/currency-context";
import { fetchAndCalculate } from "../../store/balance-slice";
import { fetchRemoteBalanceAction } from "../../store/balance-async-thunks";
import { getUserAction } from "../../store/user-slice";
import { userActions } from "../../store/user-slice";
import AddCoin from "./balance-list/add-coin/AddCoin";
export default function Balance() {
  const balance = useSelector((state) => state.balanceReducer.balance);
  const user = useSelector((state) => state.userReducer);
  const currencyCtx = useContext(CurrencyContext);

  // refs to avoid including dependencies in useEffect
  const currencyRef = useRef(currencyCtx);
  const dispatch = useDispatch();
  // grab token from storage and save it to store
  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      let decoded = jwt_decode(token);
      console.log("token present:", decoded);
      if (decoded && decoded.user_id) {
        dispatch(
          userActions.setUser({
            id: decoded.user_id,
            access_token: JSON.parse(token),
          })
        );
        dispatch(getUserAction(decoded.user_id));
      }

      // dispatch(fetchRemoteBalanceAction())
    }
    console.log("base url", process.env.REACT_APP_BASE_URL);
    console.log("backend url", process.env.REACT_APP_BACKEND_URL);
  }, [dispatch]);

  // recalculate values when balance or currency changes
  useEffect(() => {
    const coinsSlugs = balance.map((coin) => coin.slug);
    dispatch(fetchAndCalculate(coinsSlugs, currencyCtx));
  }, [balance, currencyCtx, dispatch]);

  // fetch user balance and calculate when user logs in
  useEffect(() => {
    async function fetchUserBalance() {
      return dispatch(fetchRemoteBalanceAction());
    }
    if (user.accessToken) {
      fetchUserBalance()
        .then((userBalance) => userBalance.payload.map((coin) => coin.slug))
        .then((coinsSlugs) =>
          dispatch(fetchAndCalculate(coinsSlugs, currencyRef.current))
        )
        .catch((err) => {
          return err;
        });
    }
  }, [user.accessToken, dispatch]);

  return (
    <div className="container">
      <Login />
      <Register />
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
