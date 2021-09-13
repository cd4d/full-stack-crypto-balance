import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout } from "../API/user";

export const loginAction = createAsyncThunk('user/loginUser',
    async (action) => {
        console.log('login user');
        const response = await login(action)
        const data = await response.json();
        console.log('login response:', data);
        return data
    })
export const logoutAction = createAsyncThunk('user/logoutUser',
    async (action) => {
        const response = await logout()
        const data = await response.json();
        console.log('logout response:', data);
        return data
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        'id': null, // "pk" in response
        'username': null,
        'email': null,
        'access_token': null,
        'refresh_token': null,
        'first_name': null,
        'last_name': null
    },
    reducers: {

        setUser(state, action) {
            state.id = action.payload.id
            state.username = action.payload.username
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        }
    },
    extraReducers: {
        [loginAction.fulfilled]: (state, action) => {
            state.id = action.payload.user.pk
            state.username = action.payload.user.username
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        },
        [logoutAction.fulfilled]: (state, action) => {
            state.id = null
            state.username = null
            state.access_token = null
            state.refresh_token = null
        }
    }
})
export const userActions = userSlice.actions
export default userSlice.reducer