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
      <p>+8801819214814 </p>
      <p>faa.dubd@outlook.com</p>
      <p className="contact-us-address">
        Department of Finance, University of Dhaka (DU) Campus, Nilkhet Road,
        <br /> Dhaka - 1000
      </p>
      <div className="ak-height-50 ak-height-lg-30"></div>
      <div className="d-flex gap-3">
        <SocialIcon link={"https://www.facebook.com/groups/135676929841458"}>
          <FaFacebookF />
        </SocialIcon>
        {/*  <SocialIcon link={"https://twitter.com/FAA_dubd"}>
          <FaTwitter />
        </SocialIcon>
        <SocialIcon
          link={"https://www.youtube.com/channel/UCYCf3eHZf66sm02mRl0Ex"}
        >
          <FaYoutube />
        </SocialIcon> */}
      </div>
    </div>
  );
}
