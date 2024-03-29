import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { logoutAction } from "../../store/user-slice";

export default function Header(props) {
  const CURRENCIES_LIST = [
    "usd",
    "eur",
    "cad",
    "chf",
    "aud",
    "cny",
    "jpy",
    "krw",
    "rub",
  ];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const userIsLoading = useSelector((state) => state.uiReducer.isLoading.user);

  function toggleLogin() {
    dispatch(uiActions.displayLoginModal(true));
  }
  function toggleRegister() {
    dispatch(uiActions.displayRegisterModal(true));
  }
  function handleLogout() {
    dispatch(logoutAction());
  }

  function handleChange(e) {
    props.changeCurrency(e.target.value.toString());
  }

  return (
    <header className="p-3 mb-4 border-bottom">
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="#top" className="navbar-brand">
              Crypto Balance (Fullstack)
            </a>
          </div>
          <div className="col-md-4">
            {userIsLoading ? (
              <div>
                <i
                  className="pi pi-spin pi-spinner"
                  style={{ fontSize: "2rem" }}
                ></i>
              </div>
            ) : (
              <div className="float-end me-3">
                {user.username ? (
                  <>
                    <span className="me-2">{user.username}</span>
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="btn btn-outline-dark me-2 btn-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <span className="me-2">Guest</span>
                    <button
                      onClick={toggleLogin}
                      type="button"
                      className="btn btn-outline-dark me-2 btn-sm"
                    >
                      Login
                    </button>
                    <button
                      onClick={toggleRegister}
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Register
                    </button>
                  </>
                )}
                <select
                  className="form-select w-auto d-inline ms-3"
                  name="currency"
                  id="currency"
                  onChange={handleChange}
                >
                  {CURRENCIES_LIST.map((currency, idx) => (
                    <option key={idx}>{currency}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
