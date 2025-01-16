import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaMailchimp,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { SocialIcon } from "../SocialIcon/SocialIcon";

export default function ContactInfo() {
  return (
    <div className="contact-us-info">
      <h3 className="mb-5">Finance Alumni Association</h3>
      <p>To get help, please call: ( 11AM - 9PM )</p>

      <a href="tel:+8801819214814" className=" d-flex align-items-center gap-2">
        <FaPhone />
        <span>+8801819214814 </span>
      </a>
      {/* <a href="tel:+8801973019010" className=" d-flex align-items-center gap-2">
        <FaPhone />
        <span>+8801973019010</span>
      </a>
      <a href="tel:+8801533340059" className=" d-flex align-items-center gap-2">
        <FaPhone />
        <span>+8801533340059</span>
      </a>
      <a href="tel:+8801714006407" className=" d-flex align-items-center gap-2">
        <FaPhone />
        <span>+8801714006407</span>
      </a> */}
      <a
        href="mailto:faa.dubd@outlook.com"
        className="mt-1 d-flex align-items-center gap-2"
      >
        <IoMdMail />
        <span>faa.dubd@outlook.com </span>
      </a>
      <div className="d-flex gap-2 contact-us-address">
        <span>
          {" "}
          <FaMapLocationDot />
        </span>
        <span>
          Department of Finance, University of Dhaka (DU) Campus, Nilkhet Road,
          <br /> Dhaka - 1000
        </span>
      </div>
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
