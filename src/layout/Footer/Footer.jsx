import React from "react";
import { LogoWhite } from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SocialIconTransparent } from "../../components/SocialIcon/SocialIcon";

export default function Footer() {
  return (
    <footer className="footer-section bg-footer">
      <div className="container">
        <div className="ak-height-90 ak-height-lg-60"></div>
        <div className="footer">
          <div className="logo-section">
            <LogoWhite />
            <p className="logo-title">Finance Alumni Association</p>
            <p className="logo-desp">
              FAA is a social network of ex-students of the Department of
              Finance, University of Dhaka (DU) Campus, <br />
              Nilkhet Road, Dhaka - 1000
            </p>
          </div>
          <div className="menu-section">
            <Link to="/">Home</Link>
            <Link to="/contact-us">Contact us</Link>
            <Link to="/faq">Help & FAQ</Link>
            <Link to="/member-registration">Become a member</Link>
          </div>
          <div className="social">
            <h5 className="social-title">Useful Link</h5>
            <p className="social-short-title">
              Links of Finance Alumni Association in other countries
            </p>
            <div className="social-url">
              <Link to="/gallery">Gallery</Link>
              <Link to="/about">About Us</Link>
              <Link to="/singin">Sing In</Link>
            </div>
            <div className="social-link">
              {/* <SocialIconTransparent>
                <FaLinkedinIn />
              </SocialIconTransparent> */}
              <SocialIconTransparent
                link={"https://www.facebook.com/groups/135676929841458"}
              >
                <FaFacebookF />
              </SocialIconTransparent>
              <SocialIconTransparent
                link={"https://www.youtube.com/channel/UCYCf3eHZf66sm02mRl0Ex"}
              >
                <FaYoutube />
              </SocialIconTransparent>
              <SocialIconTransparent link={"https://twitter.com/FAA_dubd"}>
                <FaTwitter />
              </SocialIconTransparent>
            </div>
          </div>
        </div>
        <div className="ak-height-70 ak-height-lg-30"></div>
        <a
          href="https://braincode.com.bd/"
          target="_blank"
          className="technology-partner"
        >
          Technology Partner: <span>Brain Code Ltd.</span>
        </a>
        <div className="ak-height-20 ak-height-lg-20"></div>
      </div>
    </footer>
  );
}
