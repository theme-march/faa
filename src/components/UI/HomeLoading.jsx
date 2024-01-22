import React from "react";
import Shimmer from "../Shimmer/Shimmer";

export default function HomeLoading() {
  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-40"></div>
      <Shimmer></Shimmer>
    </div>
  );
}
