import React from "react";
import { ButtonReadMoreArrowIcon } from "../Button/Button";
import { Link } from "react-router-dom";

export default function EventItem({ props }) {
  /*   const LinkElement = document.createElement("Link");
  LinkElement.innerHTML = props?.event_details;
  const event_details = LinkElement.innerText; */
  return (
    <div className="col">
      <div className="news-publices">
        <Link to={"/events-details"}>
          <img
            src={`http://localhost:3000/cover_image_event/${props?.cover_image}`}
            className="top-img type_2"
            alt="..."
          />
        </Link>
        <div className="body-info">
          <p className="short-title">{props?.event_date}</p>
          <Link to={"/events-details"} className="title">
            {props?.event_title}
          </Link>
          <p className="short-title-two">Banani road 11</p>
        </div>
        <div className="footer-btn">
          <ButtonReadMoreArrowIcon to="/events-details">
            Read More
          </ButtonReadMoreArrowIcon>
        </div>
      </div>
    </div>
  );
}
