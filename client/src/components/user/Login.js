import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { loginAction } from '../../store/user-slice';


import { Dialog } from 'primereact/dialog';
export default function Login() {
    const displayLoginModal = useSelector(state => state.uiReducer.displayLoginModal)
    const error = useSelector(state => state.uiReducer.error.login)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(uiActions.displayLoginModal(false))
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        await dispatch(loginAction({ "username": e.target[0].value, "password": e.target[1].value }))
        if (!error) {
            closeModal()
        }
    }
    return (

        <Dialog visible={displayLoginModal} onHide={closeModal} dismissableMask={true}>
            <form onSubmit={(e) => handleLogin(e)}>
                <div className="mb-3">
                    <label htmlFor="inputUsername" className="form-label">User name</label>
                    <input type="text" className="form-control" id="inputUsername" />

                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Dialog>
    )
}