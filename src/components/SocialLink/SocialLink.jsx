import React from "react";
import SocialItem from "./SocialItem";

export default function SocialLink() {
  const socialLinkData = [
    { link: "http://fb.com", title: "Facebook" },
    { link: "http://linkedIn.com", title: "LinkedIn" },
    { link: "http://instagram.com", title: "Instagram" },
  ];
  return (
    <div className="d-flex gap-2 gap-md-4 align-items-center flex-wrap">
      <p className="fw-bold">Social Share:</p>
      <div className="d-flex gap-5">
        {socialLinkData.map((item, i) => (
          <SocialItem key={i} to={item.link} title={item.title} />
        ))}
      </div>
    </div>
  );
}
