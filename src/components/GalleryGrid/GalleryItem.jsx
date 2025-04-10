import React from "react";
import { Link } from "react-router-dom";

export default function GalleryItem({ props }) {
  return (
    <Link
      to={`http://139.162.11.50:3000/gallery_image/${props}`}
      className={`col`}
    >
      <img
        src={`http://139.162.11.50:3000/gallery_image/${props}`}
        // alt={gallery.image}
      />
    </Link>
  );
}
