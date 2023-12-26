import React from "react";
import new_details_1 from "../assets/newpublication/new_details_1.jpg";
import new_details_2 from "../assets/newpublication/new_details_2.jpg";

export default function NewsDetails() {
  return (
    <div className="container container-max-width-910">
      <div className="ak-height-80 ak-height-lg-40"></div>
      <h2 className="new-details-page-title">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry
      </h2>
      <div className="ak-height-30 ak-height-lg-30"></div>
      <div>
        <img src={new_details_1} alt="..." className="mb-4 ak-center" />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="ak-height-40 ak-height-lg-30"></div>
      <div>
        <h2 className="mb-3 new-details-page-title">Subtitle</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="ak-height-40 ak-height-lg-30"></div>
      <div>
        <img src={new_details_2} alt="..." className="mb-4 ak-center" />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type
        </p>
      </div>
      <div className="ak-height-40 ak-height-lg-30"></div>
      <div className="ak-border-width"></div>
      <div className="ak-height-40 ak-height-lg-30"></div>
      <div>
        <div className="d-flex gap-2 gap-md-4 align-items-center flex-wrap">
          <p className="fw-bold">Social Share:</p>
          <div className="d-flex gap-5">
            <a
              className="text-decoration-underline"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              className="text-decoration-underline"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-decoration-underline"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
