import React, { useState } from "react";
import { useMemberSingInMutation } from "../../features/member/memberApiIn";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignInFrom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [memberSingIn] = useMemberSingInMutation();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await memberSingIn(formData);

      if (response?.data?.success) {
        const { email, status, id, session, admin_approval } =
          response?.data?.result;
        const sessionUser = { email, status, id, session, admin_approval };

        const jsonData = JSON.stringify(sessionUser);
        localStorage.setItem("user", jsonData);

        const expirationTimeInMinutes = 60; // Set expiration time to 60 minutes
        const expirationTimestamp =
          new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

        const dataToStore = { expirationTimestamp };
        localStorage.setItem("usertimeout", JSON.stringify(dataToStore));

        setFormData({
          email: "",
          password: "",
        });

        const successToastOptions = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        };

        toast.success("SignIn Successfully!", successToastOptions);

        let fromto = location.state?.from?.pathname || "/";
        navigate(fromto);
      } else {
        const infoToastOptions = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        };

        toast.info("User not found!", infoToastOptions);
      }
    } catch (error) {
      const errorToastOptions = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      };

      toast.error("User Data is not Submit Database", errorToastOptions);
    }
  };

  return (
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

      <div>
        <input
          type="checkbox"
          className="checkbox"
          id="vehicle3"
          name="vehicle3"
          value="Boat"
        />

        <label htmlFor="vehicle3" className="ms-2">
          I have a boat
        </label>
      </div>
      <button className="button-primary">Sign in</button>
    </form>
  );
}
