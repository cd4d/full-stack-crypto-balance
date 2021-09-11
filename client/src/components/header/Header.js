import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { Dialog } from 'primereact/dialog';
export default function Header(props) {
  const CURRENCIES_LIST = [
    'usd',
    'eur',
    'cad',
    'chf',
    'aud',
    'cny',
    'jpy',
    'krw',
    'rub',
  ];
  const dispatch = useDispatch();

  function toggleLogin(){
    dispatch(uiActions.displayLoginModal(true))
  }
  function handleChange(e) {
    props.changeCurrency(e.target.value.toString());
  }
  return (
    <header className='p-3 mb-4 border-bottom'>
      <div className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a href='#top' className='navbar-brand'>
              Crypto Balance React:
            </a>
          </div>
          <div className='col-md-4'>
            <div className='float-end me-3'>
            <button onClick={toggleLogin} type="button" className="btn btn-outline-dark me-2 btn-sm">Login</button>
            <button type="button" className="btn btn-outline-primary btn-sm">Register</button>
              <select
                className='form-select w-auto d-inline ms-3'
                name='currency'
                id='currency'
                onChange={handleChange}
              >
                {CURRENCIES_LIST.map((currency, idx) => (
                  <option key={idx}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
