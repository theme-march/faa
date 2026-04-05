import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemberResetPasswordMutation } from "../features/member/memberApiIn";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [memberResetPassword, { isLoading }] = useMemberResetPasswordMutation();

  const token = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return query.get("token") || "";
  }, [location.search]);

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1500,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token.", toastOptions);
      return;
    }

    if (!password || !confirmPassword) {
      toast.info("Please fill in both password fields.", toastOptions);
      return;
    }

    if (password.length < 6) {
      toast.info("Password must be at least 6 characters.", toastOptions);
      return;
    }

    if (password !== confirmPassword) {
      toast.info("Passwords do not match.", toastOptions);
      return;
    }

    try {
      const response = await memberResetPassword({
        token,
        new_password: password,
        confirm_password: confirmPassword,
      }).unwrap();

      if (response?.success) {
        toast.success(
          response?.message || "Password reset successful. Please sign in.",
          toastOptions
        );
        navigate("/singin");
      } else {
        toast.error(response?.message || "Unable to reset password.", toastOptions);
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Unable to reset password. Try again.",
        toastOptions
      );
    }
  };

  return (
    <div className="container">
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="sign-section">
        <div className="sign-in">
          <div className="sign-title">
            <p className="sign-text">Reset Password</p>
            <p className="mt-2 mb-0" style={{ fontSize: "13px", color: "#6b7280" }}>
              Password must be at least 6 characters.
            </p>
          </div>
          <form className="form-section" onSubmit={handleSubmit}>
            <p>New password</p>
            <input
              type="password"
              className="text-input-filed"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <p>Confirm new password</p>
            <input
              type="password"
              className="text-input-filed"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />

            <button type="submit" className="button-primary mt-3">
              {isLoading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
