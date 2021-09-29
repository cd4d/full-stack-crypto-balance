import { createSlice } from '@reduxjs/toolkit';

const addCoinSlice = createSlice({
  name: 'addCoinSlice',
  initialState: {
    searchInput: '',
    resultSearch: [],
    selectedCoin: { id: 1, amount: 0,slug: '' },
  },
  reducers: {
    setStateReducer(state, action) {
      if (action.payload.type === 'replaceData') {
        state[action.payload.field] = action.payload.data;
      }
      if (action.payload.type === 'changeProperty') {
        state[action.payload.field][action.payload.property] =
          action.payload.data;
      }
    },
  },
});

export const addCoinActions = addCoinSlice.actions;
export default addCoinSlice.reducer;
