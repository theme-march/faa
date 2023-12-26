import React from "react";
import ContactUsFrom from "../components/ContactUs/ContactUsFrom";
import GoogleMap from "../components/GoogleMap/GoogleMap";

import ContactInfo from "../components/ContactUs/ContactInfo";

export default function ContactUs() {
  return (
    <div>
      <div className="container">
        <div className="ak-height-80 ak-height-lg-40"></div>
        <h2>Send a Mail</h2>
        <div className="ak-height-35 ak-height-lg-30"></div>
        <div className="contact-us">
          <div>
            <ContactUsFrom />
          </div>
          <div className="contact-us-text">
            <ContactInfo />
          </div>
        </div>
        <div className="ak-height-80 ak-height-lg-40"></div>
      </div>
      {/* <GoogleMap /> */}
    </div>
  );
}
