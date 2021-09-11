import { createSlice } from '@reduxjs/toolkit';

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
        login(state, action) {
            state.id = action.payload.id
            state.username = action.payload.username
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        }
    }
})
export const userActions = userSlice.actions
export default userSlice.reducer