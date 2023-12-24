import { createSlice } from "@reduxjs/toolkit/react";
const initialState = {
  search: "",
};

const memberSearchSlice = createSlice({
  name: "memberSlice",
  initialState,
  reducers: {
    searchMemberName: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { searchMemberName } = memberSearchSlice.actions;

export default memberSearchSlice.reducer;
