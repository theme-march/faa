import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const loginUser = JSON.parse(localStorage.getItem("user"));
  if (loginUser?.id) {
    return children;
  }
  return (
    <Navigate to={"/singin"} state={{ from: location }} replace></Navigate>
  );
}
