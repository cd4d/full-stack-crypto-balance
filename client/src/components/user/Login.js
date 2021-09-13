import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { loginAction } from '../../store/user-slice';


import { Dialog } from 'primereact/dialog';
export default function Login() {
    const displayLoginModal = useSelector(state => state.uiReducer.displayLoginModal)
    const error = useSelector(state => state.uiReducer.error.login)
    const isLoading = useSelector(state => state.uiReducer.isLoading.login)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(uiActions.displayLoginModal(false))
        dispatch(uiActions.changeError({type:'login', value:null}))
    }
    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(loginAction({ "username": e.target[0].value, "password": e.target[1].value }))
    }
    return (

        <Dialog visible={displayLoginModal} onHide={closeModal} dismissableMask={true}>
            {error && <p className='alert-danger mt-0'>{error}</p>}
            <form onSubmit={(e) => handleLogin(e)}>
                <div className="mb-3">
                    <label htmlFor="inputUsername" className="form-label">User name</label>
                    <input type="text" className="form-control" id="inputUsername" />

                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword1" />
                </div>
                {isLoading ? <i className='pi pi-spin pi-spinner' style={{ fontSize: '2rem' }}></i> : <button type="submit" className="btn btn-primary">Submit</button>}
            </form>
        </Dialog>
    )
}