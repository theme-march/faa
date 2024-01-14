import React from "react";
import DonationCareerItem from "./DonationCareerItem";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function DonationCareer({ props }) {
  return (
    <div className="container">
      <SectionTitle>Donation & Career</SectionTitle>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {props?.map((items) => (
          <DonationCareerItem key={items?.id} props={items} />
        ))}
      </div>
    </div>
  );
}
