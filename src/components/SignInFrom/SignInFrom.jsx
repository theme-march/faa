import React from "react";

export default function SignInFrom() {
  return (
    <form className="form-section">
      <p>Login email address</p>
      <input type="text" className="text-input-filed" />

      <p>Password</p>
      <input type="text" className="text-input-filed" />

      <div>
        <input
          type="checkbox"
          className="checkbox"
          id="vehicle3"
          name="vehicle3"
          value="Boat"
        />

        <label htmlFor="vehicle3" className="ms-2">
          {" "}
          I have a boat
        </label>
      </div>
      <button className="button-primary">Sign in</button>
    </form>
  );
}
