import React from "react";
import { ButtonReadMoreArrowIcon } from "../components/Button/Button";
import EventParticipateRegistrationForm from "../components/EventRegistrationForm/EventParticipateRegistrationForm";

export default function EventParticipateRegistration() {
  return (
    <>
      <div className="ak-height-80 ak-height-lg-60"></div>
      <div className="container">
        <div className="mb-4">
          <h2>Event Participate Registration</h2>
          <p className="mt-2">
            Book as a member Book as a member{" "}
            <span className="ms-5">
              <ButtonReadMoreArrowIcon to={"/event-sponsor-registration"}>
                Event Sponsor Book
              </ButtonReadMoreArrowIcon>
            </span>
          </p>
        </div>
        <EventParticipateRegistrationForm />
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}