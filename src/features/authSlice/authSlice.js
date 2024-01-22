import { createSlice } from "@reduxjs/toolkit/react";

const initialState = {
  isAuthenticated: false,
  user: { email: "", status: 0, admin_approval: 0, id: null, session: "" },
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
      state.user = { id: null, email: "", status: 0, admin_approval: 0 };
    },
    setUser: (state, action) => {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        status: action.payload.status,
        admin_approval: action.payload.admin_approval,
        session: action.payload.session,
      };
      state.isLoading = false;
    },
    autoLoad: (state) => {
      state.isLoading = false;
    },
  },
});

export const { logOut, setUser, autoLoad } = authSlice.actions;

export default authSlice.reducer;
