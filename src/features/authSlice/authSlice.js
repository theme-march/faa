import { createSlice } from "@reduxjs/toolkit/react";

const initialState = {
  user: { email: "", rule: "" },
  isLoading: true,
  isError: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  tagType: ["user"],
  reducers: {
    logOut: (state, action) => {
      state.user = { email: "", rule: "" };
    },
    setUser: (state, action) => {
      state.user = { email: action.payload, rule: "" };

      state.isLoading = false;
    },
    autoLoad: (state) => {
      state.isLoading = false;
    },
  },
});

export const { logOut, setUser, autoLoad } = authSlice.actions;

export default authSlice.reducer;
