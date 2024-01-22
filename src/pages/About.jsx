import React, { Suspense, useState } from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import usePagesDetails from "../hook/usePagesDetails";
import aboutPagesOne from "../assets/aboutPagesOne.png";
import aboutPagesTwo from "../assets/aboutPagesTwo.png";
import Shimmer from "../components/Shimmer/Shimmer";

export default function About() {
  const pagesDetails = usePagesDetails();
  const [allsection, setallSection] = useState({});

  function handreler(id) {
    let content = pagesDetails?.result?.find((element) => element.id == id);
    setallSection(content);
  }
  let content;
  if (
    pagesDetails?.result?.length == undefined &&
    pagesDetails?.result == undefined
  ) {
    content = <Shimmer />;
  }

  if (pagesDetails?.result?.length > 0) {
    content = pagesDetails?.result?.map((page) => (
      <div key={page?.id} className="cursor-pointer ak-primary-color-hover">
        <p onClick={() => handreler(page?.id)}>{page?.title}</p>
      </div>
    ));
  }

  return (
    <>
      <CommonHero title={"About Us"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-2  order-md-0 order-2">
            <div className="d-flex flex-column gap-3">
              <h6>About Us</h6>
              <div className="d-flex flex-column gap-3">{content}</div>
            </div>
          </div>
          <div className="col-md-10 order-md-0 order-1">
            <div className="about-pages-section-one">
              <div className="profiles">
                <div>
                  <img src={aboutPagesOne} alt="Dr. Mahmood Osman Imam" />
                  <p className="fw-bold mt-2">Dr. Mahmood Osman Imam</p>
                  <p className="ak-primary-color fw-semibold">President</p>
                </div>
              </div>
              <div className="profiles-desp">
                <p className="ak-font-22 fst-italic">
                  “There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't”
                </p>
              </div>
            </div>
            <div className="ak-height-50 ak-height-lg-50"></div>
            <div className="about-pages-section-one">
              <div className="profiles">
                <div>
                  <img src={aboutPagesTwo} alt="Dr. Mahmood Osman Imam" />
                  <p className="fw-bold mt-2">Mr. Roosevelt Bhuiyan</p>
                  <p className="ak-primary-color fw-semibold">President</p>
                </div>
              </div>
              <div className="profiles-desp">
                <p className="ak-font-22 fst-italic">
                  “There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't”
                </p>
              </div>
            </div>
            <div className="ak-height-50 ak-height-lg-50"></div>
          </div>
          <div className="mb-5 order-md-0 order-3">
            <h2 className="ak-primary-color text-center mb-4">
              {allsection.title ? allsection.title : "About"}
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: allsection.details
                  ? allsection.details
                  : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
              }}
            />
          </div>
        </div>
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
