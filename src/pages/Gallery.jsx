import React from "react";
import GalleryItem from "../components/GalleryGrid/GalleryItem";
import CommonHero from "../components/CommonHero/CommonHero";
import { useGetGalleryListQuery } from "../features/gallery/galleryApiInject";

export default function Gallery() {
  const { data: galleryList } = useGetGalleryListQuery();

  return (
    <>
      <CommonHero title={"Our Gallery"} />
      <div className="ak-height-80 ak-height-lg-40"></div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2">
          {galleryList?.result?.map((gallery, i) => (
            <GalleryItem props={gallery.image} key={gallery.id} />
          ))}
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
