import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SocialIcon } from "../SocialIcon/SocialIcon";
export default function ContactInfo() {
  return (
    <div className="contact-us-info">
      <h3>Finance Alumni Association</h3>
      <p>(406) 555-0120</p>
      <p>example@email.com</p>
      <p className="contact-us-address">
        AWR NIB Tower (Level-4) House - 99, Road - 11, Block - C Banani,
        Dhaka-1213 Bangladesh
      </p>
      <div className="ak-height-50 ak-height-lg-30"></div>
      <div className="d-flex gap-3">
        <SocialIcon>
          <FaFacebookF />
        </SocialIcon>
        <SocialIcon>
          <FaTwitter />
        </SocialIcon>
        <SocialIcon>
          <FaYoutube />
        </SocialIcon>
        <SocialIcon>
          <FaLinkedinIn />
        </SocialIcon>
      </div>
    </div>
  );
}
