import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Logo } from "../../components/Logo/Logo";
import { SocialIcon } from "../../components/SocialIcon/SocialIcon";
import headerBg from "../../assets/headerBg.png";
import { useNavigate } from "react-router-dom";

export default function HeaderLogo() {
  const navigate = useNavigate();
  const hendlerOnClicks = () => {
    navigate("/");
  };
  return (
    <div>
      <div
        className="header-bg-section ak-bg"
        style={{
          backgroundImage: `url("${headerBg}")`,
        }}
      >
        <div className="container">
          <div className="header-text-section">
            <div
              className="header-logo-section  cursor-pointer"
              onClick={hendlerOnClicks}
            >
              <div className="d-flex align-items-end gap-1">
                <div>
                  <Logo />
                </div>
                <div>
                  <h6>Finance Alumni Association</h6>
                </div>
              </div>
              <p className="logo-subtitle">Creating Value Through Fellowship</p>
            </div>
            <div className="d-flex gap-3">
              <SocialIcon
                link={"https://www.facebook.com/groups/135676929841458"}
              >
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon link={"https://twitter.com/FAA_dubd"}>
                <FaTwitter />
              </SocialIcon>
              <SocialIcon
                link={"https://www.youtube.com/channel/UCYCf3eHZf66sm02mRl0Ex"}
              >
                <FaYoutube />
              </SocialIcon>
              {/*  <SocialIcon>
          <FaLinkedinIn />
        </SocialIcon> */}
            </div>
          </div>
        </div>
      </div>
      <div className="ak-border-width"></div>
    </div>
  );
}
