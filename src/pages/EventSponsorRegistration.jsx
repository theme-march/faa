import React from "react";
import EventSponsorRegistrationForm from "../components/EventRegistrationForm/EventSponsorRegistrationForm";
import { ButtonReadMoreArrowIcon } from "../components/Button/Button";
import { useParams } from "react-router-dom";
import { toNumber } from "lodash";

export default function EventSponsorRegistration() {
  const { id } = useParams();
  const eventId = toNumber(id);
  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-60"></div>
      <div className="mb-4">
        <h2>Event Sponsor Registration</h2>
        <p className="mt-2">
          Sponsor Registration Book as a guest{" "}
          <span className="ms-5">
            <ButtonReadMoreArrowIcon
              to={`/event-participate-registration/${eventId}`}
            >
              Event Participate Registration
            </ButtonReadMoreArrowIcon>
          </span>
        </p>
      </div>
      <EventSponsorRegistrationForm props={eventId} />
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
