import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/authSlice/authSlice";

export default function useUserSet() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(user);
  const loginUser = JSON.parse(localStorage.getItem("user"));

  dispatch(setUser(loginUser));
}
