import React from "react";
import event_details from "../assets/event_details.jpg";
import { ButtonPrimary } from "../components/Button/Button";
import SocialLink from "../components/SocialLink/SocialLink";
import CommonHero from "../components/CommonHero/CommonHero";
import { useParams } from "react-router-dom";
import { useGetEventDetailsIdQuery } from "../features/events/eventsApiInject";

export default function EventDetails() {
  const { id } = useParams();
  const { data } = useGetEventDetailsIdQuery();
  return (
    <>
      <CommonHero title={"Event Details"} />
      <div className="ak-height-80 ak-height-lg-60"></div>
      <div className="container container-max-width-910">
        <div>
          <h2 className="mb-4">Lorem Ipsum is simply dummy</h2>
          <img src={event_details} alt="..." className="ak-img" />
        </div>
        <div className="ak-height-50 ak-height-lg-30"></div>
        <div className="event-location-section">
          <div className="event-location">
            <h6 className="title">Event Time</h6>
            <p className="desp">
              19 August 2017 (Saturday) Start: 8:00 AM End: 10:00 AM
            </p>
          </div>
          <div className="event-location">
            <h6 className="title">Dhanmondi, Dhaka</h6>
            <p className="desp">
              901 N Pitt Str., Suite 170 Alexandria, NY, USA info@example.com
            </p>
          </div>
          <div className="event-location">
            <h6 className="title">Hour Schedule</h6>
            <p className="desp">
              9:00 AM Breakfast 11:00 AM Meeting Working Session
            </p>
          </div>
        </div>
        <div className="ak-height-50 ak-height-lg-30"></div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className="ak-height-30 ak-height-lg-30"></div>
        <h2 className="mb-4">Lorem Ipsum is simply dummy</h2>
        <ul className="">
          <li>
            Cras eleifend orci quis velit finibus, ac ultricies mi sodales.
          </li>
          <li>
            Cras eleifend orci quis velit finibus, ac ultricies mi sodales.
          </li>
          <li>
            Cras eleifend orci quis velit finibus, ac ultricies mi sodales.
          </li>
          <li>
            Cras eleifend orci quis velit finibus, ac ultricies mi sodales.
          </li>
          <li>
            Cras eleifend orci quis velit finibus, ac ultricies mi sodales.
          </li>
          <li>
            Cras eleifend orci quis velit finibus, ac ultricies mi sodales.
          </li>
          <li>
            Cras eleifend orci quis velit finibus, ac ultricies mi sodales.
          </li>
          <li>
            Cras eleifend orci quis velit finibus, ac ultricies mi sodales.
          </li>
          <li>
            Cras eleifend orci quis velit finibus, ac ultricies mi sodales.
          </li>
        </ul>
        <div className="ak-height-50 ak-height-lg-30"></div>
        <SocialLink />
        <div className="ak-height-60 ak-height-lg-30"></div>
        <div>
          <ButtonPrimary to={`/event-participate-registration/${id}`}>
            Register For Event
          </ButtonPrimary>
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
