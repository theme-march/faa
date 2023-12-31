import React from "react";

export default function SocialItem({ to, title }) {
  return (
    <a
      className="text-decoration-underline"
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </a>
  );
}
