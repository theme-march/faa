import React from "react";
import { ButtonReadMoreArrowIcon } from "../components/Button/Button";
import SignInFrom from "../components/SignInFrom/SignInFrom";

export default function SignIn() {
  return (
    <div className="container">
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="sign-section">
        <div className="sign-in">
          <div className="sign-title">
            <div className="register-link">
              <ButtonReadMoreArrowIcon to={"/member-registration"}>
                Go to register
              </ButtonReadMoreArrowIcon>
            </div>
            <div className="ak-border-width "></div>
            <p className="sign-text">Sign in</p>
          </div>
          <SignInFrom />
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
