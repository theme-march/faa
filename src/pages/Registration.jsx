import React from "react";
import { ButtonReadMoreArrowIcon } from "../components/Button/Button";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";

export default function Registration() {
  return (
    <>
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <div className="mb-4">
          <h2>Become a Member</h2>
          <p className="mt-2">
            Already have a FAA Account?{" "}
            <span className="ms-5">
              <ButtonReadMoreArrowIcon to={"/singin"}>
                Sign In
              </ButtonReadMoreArrowIcon>
            </span>
          </p>
        </div>
        <RegistrationForm />
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
