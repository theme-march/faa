import React from "react";

export default function SectionTitle({ children }) {
  return (
    <>
      <h1 className="section-title">{children}</h1>
      <div className="ak-height-60 ak-height-lg-40"></div>
    </>
  );
}
