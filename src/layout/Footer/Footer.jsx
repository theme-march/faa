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
              Finance, University of Dhaka (DU)
            </p>
          </div>
          <div className="menu-section">
            <Link to="/contact">Contact us</Link>
            <Link to="/faq">Help & FAQ</Link>
            <Link to="/find">Find an alumnus</Link>
            <Link to="/member">Become a member</Link>
            <Link to="/temas">Terms of use</Link>
          </div>
          <div className="social">
            <h5 className="social-title">Useful Link</h5>
            <p className="social-short-title">
              Links of Finance Alumni Association in other countries
            </p>
            <div className="social-url">
              <Link to="/contact">Contact us</Link>
              <Link to="/faq">Help & FAQ</Link>
              <Link to="/find">Find an alumnus</Link>
            </div>
            <div className="social-link">
              <SocialIconTransparent>
                <FaLinkedinIn />
              </SocialIconTransparent>
              <SocialIconTransparent>
                <FaFacebookF />
              </SocialIconTransparent>
              <SocialIconTransparent>
                <FaYoutube />
              </SocialIconTransparent>
              <SocialIconTransparent>
                <FaTwitter />
              </SocialIconTransparent>
            </div>
          </div>
        </div>
        <div className="ak-height-90 ak-height-lg-60"></div>
      </div>
    </footer>
  );
}
