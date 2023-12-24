import React from "react";
import GalleryItem from "../components/GalleryGrid/GalleryItem";
import galleryImg from "../assets/Gallery/gallery_1.jpg";

export default function Gallery() {
  return (
    <>
      <div className="ak-height-80 ak-height-lg-40"></div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2">
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
          <GalleryItem props={galleryImg} />
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
