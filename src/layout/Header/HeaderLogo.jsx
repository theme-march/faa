import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Logo } from "../../components/Logo/Logo";
import { SocialIcon } from "../../components/SocialIcon/SocialIcon";

export default function HeaderLogo() {
  return (
    <div>
      <div
        className="header-bg-section ak-bg"
        style={{
          backgroundImage: `url("headerBg.png")`,
        }}
      >
        <div className="container">
          <div className="header-text-section">
            <div className="header-logo-section">
              <div className="d-flex align-items-end gap-1">
                <div>
                  <Logo />
                </div>
                <div>
                  <h6>Finance Alumni Association</h6>
                </div>
              </div>
              <p>Creating Value Through Fellowship</p>
            </div>
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
        </div>
      </div>
      <div className="ak-border-width"></div>
    </div>
  );
}
