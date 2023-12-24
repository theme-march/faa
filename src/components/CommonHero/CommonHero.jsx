import React from "react";
import commonHero from "../../assets/commonHero.jpg";

export default function CommonHero({ title }) {
  return (
    <div className="ak-commmon-hero ak-style1 ak-bg">
      <img src={commonHero} alt="..." className="commmon-hero-img" />
      <div className="ak-commmon-heading">
        <div className="ak-section-heading ak-style-1 ak-type-1 ak-color-1 page-top-title">
          <h2 className="ak-section-title">{title}</h2>
        </div>
      </div>
    </div>
  );
}
