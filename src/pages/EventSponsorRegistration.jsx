import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import EventSponsorRegistrationForm from "../components/EventRegistrationForm/EventSponsorRegistrationForm";
import { ButtonReadMoreArrowIcon } from "../components/Button/Button";

export default function EventSponsorRegistration() {
  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-60"></div>
      <div className="mb-4">
        <h2>Event Sponsor Registration</h2>
        <p className="mt-2">
          Sponsor Registration Book as a guest{" "}
          <span className="ms-5">
            <ButtonReadMoreArrowIcon to={"/events-registration"}>
              Event Participate Registration
            </ButtonReadMoreArrowIcon>
          </span>
        </p>
      </div>
      <EventSponsorRegistrationForm />
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
