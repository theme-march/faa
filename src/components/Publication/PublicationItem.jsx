import React from "react";
import { Link } from "react-router-dom";

export default function PublicationItem({ props }) {
  return (
    <div className="col">
      <div className="publication-item">
        <Link to={`/images/publication/${props.file}`} target="_blank">
          <img
            src={`/images/publication/${props?.cover_image}`}
            className="top-img"
            alt="..."
          />
        </Link>
        <div className="publication-title">
          <Link
            to={`/images/publication/${props.file}`}
            className="ttile"
            target="_blank"
          >
            {props?.title?.slice(0, 20)}...
          </Link>
        </div>
      </div>
    </div>
  );
}
