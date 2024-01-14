import React from "react";
import { Link } from "react-router-dom";
import { ButtonReadMoreArrowIcon } from "../Button/Button";

export default function NewsItem({ props }) {
  return (
    <div className="col">
      <div className="news-publices">
        <Link to={"/news-details"}>
          <img
            src={`http://localhost:3000/publication/${props?.cover_image}`}
            className="top-img"
            alt="..."
          />
        </Link>
        <div className="body-info">
          <p className="short-title">25 March, 2023 11:22 PM</p>

          <Link to={"/news-details"} className="title">
            {props?.title}
          </Link>
        </div>
        <div className="footer-btn">
          <ButtonReadMoreArrowIcon to="/news-details">
            Read More
          </ButtonReadMoreArrowIcon>
        </div>
      </div>
    </div>
  );
}
