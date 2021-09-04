import React from "react";
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
  function handleChange(e) {
    console.log(e.target.value.toString());
    props.changeCurrency(e.target.value.toString());
  }
  return (
    <header className="p-3 mb-4 border-bottom">
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="#top" className="navbar-brand">
              Crypto Balance React: 
            </a>
          </div>
          <div className="col-md-3">
            <select
              className="form-select w-auto float-end me-3"
              name="currency"
              id="currency"
              onChange={handleChange}
            >
              {CURRENCIES_LIST.map((currency, idx) => (
                <option key={idx}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
