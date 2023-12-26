import React from "react";
import AccordionCustom from "../components/AccordionCustom/AccordionCustom";
import ContactInfo from "../components/ContactUs/ContactInfo";
import CommonHero from "../components/CommonHero/CommonHero";

export default function Faq() {
  return (
    <>
      <CommonHero title={"Help & FAQ"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <div className="ak-height-50 ak-height-lg-30"></div>
        <div className="contact-us">
          <AccordionCustom />
          <div className="contact-us-text">
            <ContactInfo />
          </div>
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
