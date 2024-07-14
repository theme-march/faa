import React from "react";
import { Link } from "react-router-dom";
import { ButtonReadMoreArrowIcon } from "../Button/Button";

export default function ProgramItem({ props }) {
  return (
    <div className="col">
      <div className="news-publices">
        <Link to={`/programs-details/${props?.id}`}>
          <img
            src={`/images/programs/${props?.image}`}
            className="top-img type_2"
            alt="..."
          />
        </Link>
        <div className="body-info">
          <Link to={`/programs-details/${props?.id}`} className="title mt-3">
            {props?.title}
          </Link>
          <p
            className="short-title-two"
            dangerouslySetInnerHTML={{ __html: props.details.slice(0, 99) }}
          />
        </div>
        <div className="footer-btn">
          <ButtonReadMoreArrowIcon to={`/programs-details/${props?.id}`}>
            Read More
          </ButtonReadMoreArrowIcon>
        </div>
      </div>
    </div>
  );
}
