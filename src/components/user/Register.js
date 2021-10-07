import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { registerAction } from '../../store/user-slice';
import { Dialog } from 'primereact/dialog';

export default function Register() {
    const displayRegisterModal = useSelector(state => state.uiReducer.displayRegisterModal)
    const error = useSelector(state => state.uiReducer.error.register)
    const isLoading = useSelector(state => state.uiReducer.isLoading.register)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(uiActions.displayRegisterModal(false))
        dispatch(uiActions.clearError({type:'register'}))
    }
    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(registerAction({ "username": e.target[0].value, "password1": e.target[1].value,"password2": e.target[2].value }))
    }
    return (

        <Dialog visible={displayRegisterModal} onHide={closeModal} dismissableMask={true}>
            {error && <p className='alert-danger mt-0'>{error}</p>}
            <form onSubmit={(e) => handleRegister(e)}>
                <div className="mb-3">
                    <label htmlFor="inputUsername" className="form-label">User name</label>
                    <input type="text" className="form-control" id="inputUsername" />

                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword2" className="form-label">Confirm</label>
                    <input type="password" className="form-control" id="inputPassword2" />
                </div>
                {isLoading ? <i className='pi pi-spin pi-spinner' style={{ fontSize: '2rem' }}></i> : <button type="submit" className="btn btn-primary">Submit</button>}
            </form>
        </Dialog>
    )
}