import { createSlice } from "@reduxjs/toolkit";

const addCoinSlice = createSlice({
  name: "addCoinSlice",
  initialState: {
    searchInput: "",
    resultSearch: [],
    selectedCoin: { id: "", amount: 0 },
  },
  reducers: {
    setStateReducer(state, action) {
      //console.log(state, action);
      if (action.payload.type === "replaceState") {
        state[action.payload.field] = action.payload.data;
      }
      if (action.payload.type === "replaceProperty") {
        state[action.payload.field][action.payload.property] =
          action.payload.data;
      }
    },
  },
});

export const addCoinActions = addCoinSlice.actions;
export default addCoinSlice.reducer;
