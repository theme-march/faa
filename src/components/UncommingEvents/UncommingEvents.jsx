import React from "react";
import { ButtonPrimary } from "../Button/Button";

export default function UncommingEvents() {
  return (
    <div className="container">
      <div className="upcomming-event">
        <div className="upcomming-event-text-section">
          <h2 className="upcomming-event-title">Upcoming Events</h2>

          <div className="event-time">
            <p className="event-text">
              Event Name: <span>The Demo Event Date &</span>
            </p>
            <p className="event-text">
              Time: <span> 12.12.13, 11.00 AM Short</span>
            </p>
            <p className="event-text">
              Details:
              <span>
                {" "}
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's stan.
              </span>
            </p>
          </div>

          <div>
            <div className="ak-height-50 ak-height-lg-20"></div>
            <ButtonPrimary>Register Now</ButtonPrimary>
          </div>
        </div>
        <div className="upcomming-even-img-section">
          <img
            src="upcommingevent.jpg"
            className="ak-bg w-100 h-100"
            alt="upcommingevent"
          />
        </div>
      </div>
    </div>
  );
}
