import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from "../API/db";

export const loginAction = createAsyncThunk('user/loginUser',
    async (action,thunkAPI) => {
        console.log('login user');
        const response = await login(action)
        const data = await response.json();
        console.log('login response:', data);
        return data


    })

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
            state.id = action.payload.id
            state.username = action.payload.username
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        }
    }
})
export const userActions = userSlice.actions
export default userSlice.reducer