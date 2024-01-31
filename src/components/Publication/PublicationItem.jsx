import React from "react";

export default function PublicationItem({ props }) {
  return (
    <div className="col">
      <div className="publication-item">
        <img
          src={`http://174.138.171.172:3000/cover_image_event/${props?.cover_image}`}
          className="top-img"
          alt="..."
        />
        <div className="publication-title">
          <p className="ttile">The title</p>
        </div>
      </div>
    </div>
  );
}
