import React, { useState } from "react";
import { useMemberSingInMutation } from "../../features/member/memberApiIn";
import { toast } from "react-toastify";

export default function SignInFrom() {
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
      if (response.data.success === true) {
        setFormData({
          email: "",
          password: "",
        });
        toast.success("SingIn Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      } else {
        toast.info("User not found!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("User Data Submit in Database", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
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
        className="text-input-filed"
      />

      <p>Password</p>
      <input
        type="text"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
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
