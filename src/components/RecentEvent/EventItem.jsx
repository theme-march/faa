import React from "react";
import { ButtonReadMoreArrowIcon } from "../Button/Button";
import { Link } from "react-router-dom";
import DateFormat from "../DateFormat/DateFormat";

export default function EventItem({ props }) {
  return (
    <div className="col">
      <div className="news-publices">
        <Link to={`/events-details/${props?.id}`}>
          <img
            src={`/images/cover_image_event/${props?.cover_image}`}
            className="top-img type_2"
            alt="..."
          />
        </Link>
        <div className="body-info">
          <p className="short-title">
            <DateFormat props={props?.event_date} />
          </p>
          <Link to={`/events-details/${props?.id}`} className="title">
            {props?.event_title}
          </Link>
          <p className="short-title-two">{props?.event_venue}</p>
        </div>
        <div className="footer-btn">
          <ButtonReadMoreArrowIcon to={`/events-details/${props?.id}`}>
            Read More
          </ButtonReadMoreArrowIcon>
        </div>
      </div>
    </div>
  );
}
