import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import { Dialog } from 'primereact/dialog';
export default function Login() {
    const displayLoginModal = useSelector(state => state.uiReducer.displayLoginModal)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(uiActions.displayLoginModal(false))
    }
    const handleLogin = (e) => {
        e.preventDefault()
        console.log(e)
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