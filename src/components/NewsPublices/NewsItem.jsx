import React from "react";
import { Link } from "react-router-dom";
import { ButtonReadMoreArrowIcon } from "../Button/Button";
import DateFormat from "../DateFormat/DateFormat";

export default function NewsItem({ props }) {
  console.log(props);
  return (
    <div className="col">
      <div className="news-publices">
        <Link to={`/news-details/${props?.id}`}>
          <img
            src={`http://localhost:3000/publication/${props?.cover_image}`}
            className="top-img"
            alt="..."
          />
        </Link>
        <div className="body-info">
          <p className="short-title">
            <DateFormat props={props?.created_at} />
          </p>
          <Link to={`/news-details/${props?.id}`} className="title">
            {props?.title}
          </Link>
        </div>
        <div className="footer-btn">
          <ButtonReadMoreArrowIcon to={`/news-details/${props?.id}`}>
            Read More
          </ButtonReadMoreArrowIcon>
        </div>
      </div>
    </div>
  );
}
