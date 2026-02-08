import React from "react";

export default function MovingText(props) {
  return (
    <div className="ak-moving-section-wrap ak-normal">
      <div className="ak-moving-section-in ak-animation-speed-70 ak-moving-section-hover-push">
        <div className="ak-moving-section">
          <p className=" mx-2">{props.children}</p>
          <p className=" mx-2">{props.children}</p>
          <p className=" mx-2">{props.children}</p>
        </div>
        <div className="ak-moving-section">
          <p className=" mx-2">{props.children}</p>
          <p className=" mx-2">{props.children}</p>
          <p className=" mx-2">{props.children}</p>
        </div>
        <div className="ak-moving-section">
          <p className=" mx-2">{props.children}</p>
          <p className=" mx-2">{props.children}</p>
          <p className=" mx-2">{props.children}</p>
        </div>
      </div>
    </div>
  );
}
