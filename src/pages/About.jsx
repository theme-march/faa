import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import usePagesDetails from "../hook/usePagesDetails";
import aboutPagesOne from "../assets/aboutPagesOne.png";
import aboutPagesTwo from "../assets/aboutPagesTwo.png";
import { Link } from "react-router-dom";

export default function About() {
  const pagesDetails = usePagesDetails();
  console.log(pagesDetails?.result);
  return (
    <>
      <CommonHero title={"About Us"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
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
              “There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't”
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
              “There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't”
            </p>
          </div>
        </div>
        <div className="ak-height-100 ak-height-lg-60"></div>
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex flex-column gap-3">
              <h6>About Us</h6>
              <div className="d-flex flex-column gap-3">
                <div>
                  <Link to={"/history"}>History</Link>
                </div>
                <div>
                  <Link to={"/objectives"}>Objectives</Link>
                </div>
                <div>
                  <Link to={"/executive-committee"}>Executive Committee</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {" "}
            {pagesDetails?.result?.map((page) => (
              <div className="mb-5">
                <h2 className="ak-primary-color text-center mb-4">
                  {page?.title}
                </h2>
                <p dangerouslySetInnerHTML={{ __html: page?.details }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
