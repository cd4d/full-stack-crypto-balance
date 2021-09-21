import { setAccessToken,setRefreshToken } from "../API/balance"
import { addCoinActions } from "./addCoin-slice";

const tokenMiddleware = storeAPI => next => action => {
    const state = storeAPI.getState()
    if (action.type === 'balance/fetchBalance/pending') {
        const accessToken = state.userReducer.accessToken
        const refreshToken = state.userReducer.refreshToken
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)

    }
    if(addCoinActions.type === 'user/loginUser/fulfilled'){
        const refreshToken = state.userReducer.refreshToken
        setRefreshToken(refreshToken)
    }

    return next(action)
}

export default tokenMiddleware