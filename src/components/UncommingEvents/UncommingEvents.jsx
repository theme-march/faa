import React from "react";
import { ButtonPrimary } from "../Button/Button";

export default function UncommingEvents({ props }) {
  const { event_title, event_date, event_details, cover_image } = props[0];
  return (
    <div className="container">
      <div className="upcomming-event">
        <div className="upcomming-event-text-section">
          <h2 className="upcomming-event-title">Upcoming Events</h2>

          <div className="event-time">
            <p className="event-text">
              Event Name: <span>{event_title}</span>
            </p>
            <p className="event-text">
              Date & Time: <span> {event_date}</span>
            </p>
            <p className="event-text">
              Short Details:
              <span>{event_details}</span>
            </p>
          </div>

          <div>
            <div className="ak-height-50 ak-height-lg-20"></div>
            <ButtonPrimary to={"/events-registration"}>
              Register Now
            </ButtonPrimary>
          </div>
        </div>
        <div className="upcomming-even-img-section">
          <img
            src={`http://localhost:3000/cover_image_event/${cover_image}`}
            className="ak-bg w-100 h-100"
            alt="upcommingevent"
          />
        </div>
      </div>
    </div>
  );
}
