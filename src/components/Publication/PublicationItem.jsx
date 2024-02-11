import React from "react";

export default function PublicationItem({ props }) {
  return (
    <div className="col">
      <div className="publication-item">
        <img
          src={`http://174.138.171.172:3000/publication/${props?.cover_image}`}
          className="top-img"
          alt="..."
        />
        <div className="publication-title">
          <p className="ttile">{props?.title?.slice(0, 20)}...</p>
        </div>
      </div>
    </div>
  );
}
