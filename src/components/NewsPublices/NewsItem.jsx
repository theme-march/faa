import React from "react";
import { Link } from "react-router-dom";
import { ButtonReadMoreArrowIcon } from "../Button/Button";

export default function NewsItem() {
  return (
    <div className="col">
      <div className="news-publices">
        <Link to={"/"}>
          <img
            src="newpublication/newpublication_1.jpg"
            className="top-img"
            alt="..."
          />
        </Link>
        <div className="body-info">
          <p className="short-title">25 March, 2023 11:22 PM</p>

          <Link to={"/"} className="title">
            Here is the title of the blog item. You can change and add.
          </Link>
        </div>
        <div className="footer-btn">
          <ButtonReadMoreArrowIcon to="/">Read More</ButtonReadMoreArrowIcon>
        </div>
      </div>
    </div>
  );
}
