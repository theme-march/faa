import React from "react";
import { Link } from "react-router-dom";

export function SocialIcon(props) {
  return (
    <Link to={props?.link} className="social-icon">
      {props?.children}
    </Link>
  );
}
export function SocialIconTransparent(props) {
  return (
    <Link to={props?.link} className="social-icon-transparent">
      {props?.children}
    </Link>
  );
}
