import React from "react";
import { Link } from "react-router-dom";

export default function GalleryItem({ props }) {
  return (
    <Link to={`/images/gallery_image/${props}`} className={`col`}>
      <img src={`/images/gallery_image/${props}`} alt={props} />
    </Link>
  );
}
