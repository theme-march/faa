import React from "react";

export default function MovingText(props) {
  return (
    <div className="ak-moving-section-wrap ak-normal">
      <div className="ak-moving-section-in ak-animation-speed-10 ">
        <div className="ak-moving-section">
          <p>{props.children}</p>
          <p>{props.children}</p>
          <p>{props.children}</p>
        </div>
        <div className="ak-moving-section">
          <p>{props.children}</p>
          <p>{props.children}</p>
          <p>{props.children}</p>
        </div>
      </div>
    </div>
  );
}
