import React from "react";

import GalleryItem from "../components/GalleryGrid/GalleryItem";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import CommonHero from "../components/CommonHero/CommonHero";
import { useGetGalleryListQuery } from "../features/gallery/galleryApiInject";

const Gallery = () => {
  const { data: imageData } = useGetGalleryListQuery();
  return (
    <>
      <CommonHero title={"Our Gallery"} />
      <div className="ak-height-80 ak-height-lg-40"></div>
      <div className="container gallery-style">
        <LightGallery
          speed={500}
          plugins={[lgThumbnail]}
          elementClassNames={
            " row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2"
          }
        >
          {imageData?.result.map((gallery, index) => (
            <GalleryItem props={gallery.image} key={gallery.id} />
          ))}
        </LightGallery>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
};

export default Gallery;
