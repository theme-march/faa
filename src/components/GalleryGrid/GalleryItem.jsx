import React from "react";

export default function GalleryItem({ props }) {
  return (
    <div className="col">
      <img
        src={`/images/gallery_image/${props}`}
        alt="...."
        className="w-100"
      />
    </div>
  );
}
