import { setAccessToken,setRefreshToken } from "../API/balance"
import { addCoinActions } from "./addCoin-slice";

const tokenMiddleware = storeAPI => next => action => {
    if (action.type === 'balance/fetchBalance/pending') {
        const state = storeAPI.getState()
        const accessToken = state.userReducer.accessToken
        setAccessToken(accessToken)
    }
    if(addCoinActions.type === 'user/loginUser/fulfilled'){
        const state = storeAPI.getState()
        const refreshToken = state.userReducer.refreshToken
        setRefreshToken(refreshToken)
    }

    return next(action)
}

export default tokenMiddleware