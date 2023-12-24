import React from "react";
import { ButtonReadMoreArrowIcon } from "../components/Button/Button";
import EventRegistrationForm from "../components/EventRegistrationForm/EventRegistrationForm";

export default function EventRegistration() {
  return (
    <>
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <div className="mb-4">
          <h2>Event Registration</h2>
          <p className="mt-2">
            Book as a sponsor Book as a guest{" "}
            <span className="ms-5">
              <ButtonReadMoreArrowIcon to={"/event"}>
                Book as a member
              </ButtonReadMoreArrowIcon>
            </span>
          </p>
        </div>
        <EventRegistrationForm />
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
