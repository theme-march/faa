import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { clearAuthSession, hasActiveSession } from "../../utils/authStorage";

export default function PrivateRoute({ children }) {
  const location = useLocation();

  if (hasActiveSession()) {
    return children;
  }

  clearAuthSession();

  return (
    <Navigate to={"/singin"} state={{ from: location }} replace></Navigate>
  );
}
