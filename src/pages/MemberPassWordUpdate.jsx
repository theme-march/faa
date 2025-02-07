import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMemberUpdatePasswordMutation } from "../features/member/memberApiIn";
import { toast } from "react-toastify";
import ErrorPages from "./ErrorPages";

export default function UpdatePassword() {
  const { id } = useParams();
  const loginUser = JSON.parse(localStorage.getItem("user"));

  if (Number(loginUser?.id) !== Number(id))
    return (
      <>
        <ErrorPages />
      </>
    );

  const [memberUpdatePassword] = useMemberUpdatePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.info("New and Confirm passwords do not match.", toastOptions);
      return;
    }

    try {
      const formData = {
        member_id: id,
        current_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };

      const response = await memberUpdatePassword(formData);

      if (response.data.success) {
        toast.success(response.data.message, toastOptions);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.info(response.data.message, toastOptions);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", toastOptions);
    }
  };

  return (
    <div className="container">
      <div className="password-update mt-5">
        <h5 className="mb-4 text-uppercase">Update Password</h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePasswordUpdate();
          }}
        >
          <div className="form-group mb-3">
            <label>Old Password</label>
            <div className="input-group flex-nowrap">
              <input
                type={showPassword.old ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="text-input-filed type_2"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => togglePasswordVisibility("old")}
              >
                {showPassword.old ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-group  mb-3">
            <label>New Password</label>
            <div className="input-group flex-nowrap">
              <input
                type={showPassword.new ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control text-input-filed type_2"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPassword.new ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-group mb-3">
            <label>Confirm New Password</label>
            <div className="input-group flex-nowrap">
              <input
                type={showPassword.confirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-input-filed type_2"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPassword.confirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="button-primary mt-3">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
