import React from "react";
import { ButtonReadMoreArrowIcon } from "../Button/Button";
import { Link } from "react-router-dom";

export default function EventItem() {
  return (
    <div className="col">
      <div className="news-publices">
        <Link to={"/"}>
          <img
            src="recentevent/recentevent_1.jpg"
            className="top-img type_2"
            alt="..."
          />
        </Link>
        <div className="body-info">
          <p className="short-title">25 March, 2023 11:22 PM</p>
          <Link to={"/"} className="title">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum,
            adipisci.
          </Link>
          <p className="short-title-two">Banani road 11</p>
        </div>
        <div className="footer-btn">
          <ButtonReadMoreArrowIcon to="/">Read More</ButtonReadMoreArrowIcon>
        </div>
      </div>
    </div>
  );
}
