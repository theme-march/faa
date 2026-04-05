import React, { useState } from "react";
import {
  useMemberForgotPasswordMutation,
  useMemberSingInMutation,
} from "../../features/member/memberApiIn";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthSession } from "../../utils/authStorage";

export default function SignInFrom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [memberSingIn] = useMemberSingInMutation();
  const [memberForgotPassword, { isLoading: isSendingResetLink }] =
    useMemberForgotPasswordMutation();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await memberSingIn(formData).unwrap();

      if (response?.success) {
        const authToken = response?.token || "";
        // UPDATED
        const refreshToken = response?.refresh_token || "";

        setAuthSession({
          token: authToken,
          refreshToken,
        });

        setFormData({
          email: "",
          password: "",
        });

        toast.success("SignIn Successfully!", toastOptions);

        let fromto = location.state?.from?.pathname || "/";
        navigate(fromto);
      } else {
        toast.info("User not found!", toastOptions);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Login failed. Please try again.", toastOptions);
    }
  };

  const openForgotModal = () => {
    setForgotEmail(formData.email || "");
    setShowForgotModal(true);
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const email = forgotEmail.trim();

    if (!email) {
      toast.info("Please enter your email address.", toastOptions);
      return;
    }

    try {
      const response = await memberForgotPassword({
        email,
        app_base_url: window.location.origin,
      }).unwrap();
      if (response?.success) {
        toast.success(
          response?.message || "Password reset link sent to your email.",
          toastOptions
        );
        setShowForgotModal(false);
      } else {
        toast.info(response?.message || "Unable to send reset link.", toastOptions);
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Unable to send reset link. Please try again.",
        toastOptions
      );
    }
  };

  return (
    <>
      <form className="form-section" method="POST" onSubmit={handleSubmit}>
        <p>Login email address</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          className="text-input-filed"
        />

        <p>Password</p>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="current-password"
          className="text-input-filed"
        />

        <button
          type="button"
          className="forgot-toggle-btn"
          onClick={openForgotModal}
        >
          Forgot password?
        </button>

        <button className="button-primary mt-3">Sign in</button>
      </form>

      {showForgotModal ? (
        <div className="forgot-password-modal-backdrop" onClick={closeForgotModal}>
          <div
            className="forgot-password-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="forgot-password-modal-header">
              <h5>Forgot Password</h5>
              <button
                type="button"
                className="forgot-modal-close"
                onClick={closeForgotModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleForgotPasswordSubmit}>
              <p>Reset link email</p>
              <input
                type="email"
                className="text-input-filed"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                autoComplete="email"
              />
              <button
                type="submit"
                className="button-primary mt-3 w-100"
                disabled={isSendingResetLink}
              >
                {isSendingResetLink ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
