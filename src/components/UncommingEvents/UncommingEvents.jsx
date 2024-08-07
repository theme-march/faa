import React from "react";
import { ButtonPrimary } from "../Button/Button";
import DateFormat from "../DateFormat/DateFormat";

export default function UncommingEvents({ props }) {
  const {
    event_title,
    event_date,
    event_short_details,
    cover_image,
    id,
    event_venue,
  } = props[0];
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
              Date & Time:{" "}
              <span>
                <DateFormat props={event_date} />
              </span>
            </p>
            <p className="event-text my-2">
              Venue: <span> {event_venue}</span>
            </p>

            <div className="event-text d-flex">
              <p className="flex-shrink-0">Details: </p>
              <span
                className="flex-shrink-1"
                dangerouslySetInnerHTML={{ __html: event_short_details }}
              />
            </div>
          </div>

          <div>
            <div className="ak-height-50 ak-height-lg-20"></div>
            <ButtonPrimary to={`/events-details/${id}`}>
              Register Now
            </ButtonPrimary>
          </div>
        </div>
        <div className="upcomming-even-img-section">
          <img
            src={`/images/cover_image_event/${cover_image}`}
            className="ak-bg w-100 h-100"
            alt="upcommingevent rounded"
          />
        </div>
      </div>
    </div>
  );
}
