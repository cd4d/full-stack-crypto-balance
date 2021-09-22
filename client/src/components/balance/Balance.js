import { React, useEffect, useContext } from "react";
import BalanceList from "./balance-list/BalanceList";
import EmptyBalance from "../balance/EmptyBalance";

import BalanceChart from "./balance-chart/BalanceChart";
import BalanceNews from "./balance-news/BalanceNews";
import Login from "../user/Login";
import { useSelector, useDispatch } from "react-redux";
import CurrencyContext from "../../store/currency-context";
import { balanceActions, fetchAndCalculate } from "../../store/balance-slice";
import { fetchBalanceAction } from "../../store/balance-actions";
import AddCoin from "./balance-list/add-coin/AddCoin";
export default function Balance() {
  const currencyCtx = useContext(CurrencyContext);

  const balance = useSelector((state) => state.balanceReducer.balance);
  const user = useSelector((state) => state.userReducer);
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
      })
    );
    // disabling coinsList check to avoir infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyCtx, dispatch]);

  useEffect(() => {
   if(user.accessToken){
    dispatch(fetchBalanceAction({accessToken:user.accessToken}))
   }
  },[user.accessToken,dispatch]);



  function updateBalance(newBalance) {
    console.log("newBalance", newBalance);
    dispatch(balanceActions.updateBalance(newBalance));

    console.log("updating balance");
    dispatch(balanceActions.calculateBalance());
  }
  
  return (
    <div className="container">
      <Login />
      <div className="row">
      <AddCoin balance={balance} updateBalance={updateBalance} />
      {balance.length ? (
        <>
        <div className="col-md-8 col-sm-12">
        
            <BalanceList
              
            ></BalanceList>
          
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
