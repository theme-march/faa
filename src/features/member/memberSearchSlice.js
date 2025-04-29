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
    clearSearch: (state) => {
      state.search = ""; // ✅ clear search
    },
  },
});

export const { searchMemberName ,clearSearch } = memberSearchSlice.actions;

export default memberSearchSlice.reducer;
