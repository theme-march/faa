import React, { useEffect, useState, useCallback, useMemo } from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import usePagesDetails from "../hook/usePagesDetails";
import Shimmer from "../components/Shimmer/Shimmer";
import { useGetAboutUsMessageQuery } from "../features/pageDetails/pageDetails";
import { useLocation } from "react-router-dom";

export default function About() {
  const pagesDetails = usePagesDetails();
  const [allSection, setAllSection] = useState({});
  const { data, error, isLoading } = useGetAboutUsMessageQuery();
  const location = useLocation();
  const [fetchError, setFetchError] = useState(null);

  // This function will parse the query parameters from the URL
  const getQueryParams = useCallback((search) => {
    return new URLSearchParams(search);
  }, []);

  const queryParams = useMemo(
    () => getQueryParams(location.search),
    [location.search, getQueryParams]
  );
  const title = queryParams.get("id"); // Get the 'id' query parameter

  const handler = useCallback(
    (title) => {
      try {
        const content = pagesDetails?.result?.find(
          (element) => element.title === title
        );
        setAllSection(content);
      } catch (err) {
        setFetchError("An error occurred while fetching the page details.");
        console.error(err);
      }
    },
    [pagesDetails]
  );

  useEffect(() => {
    try {
      if (!allSection?.title && pagesDetails?.result?.length > 0) {
        const initialSection = pagesDetails?.result?.find(
          (element) => element.title === title
        );
        setAllSection(initialSection || pagesDetails?.result[0]);
      }
    } catch (err) {
      setFetchError("An error occurred while initializing the section.");
      console.error(err);
    }
  }, [allSection, pagesDetails, title]);

  let content;
  if (isLoading) {
    content = <Shimmer />;
  } else if (error || fetchError) {
    content = <div>Error loading data: {error?.message || fetchError}</div>;
  } else if (pagesDetails?.result?.length > 0) {
    content = pagesDetails.result.map((page) => (
      <div key={page.id} className="cursor-pointer ak-primary-color-hover">
        <p onClick={() => handler(page.title)}>{page.title}</p>
      </div>
    ));
  }

  return (
    <>
      <CommonHero title="About Us" />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-2 order-md-0 order-2">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-3">{content}</div>
            </div>
          </div>
          <div className="col-md-10 order-md-0 order-1">
            {data?.result?.map((elem, index) => (
              <div key={index}>
                <div className="about-pages-section-one">
                  <div className="profiles">
                    <div>
                      <img
                        src={`/images/about_us_message_image/${elem?.image}`}
                        alt="Dr. Mahmood Osman Imam"
                        className="about_us_message_image"
                      />
                      <p className="fw-bold mt-2">{elem?.name}</p>
                      <p className="ak-primary-color fw-semibold">
                        {elem?.designation}
                      </p>
                    </div>
                  </div>
                  <div className="profiles-desp">
                    <p
                      className="ak-font-22 fst-italic"
                      dangerouslySetInnerHTML={{
                        __html: elem?.message,
                      }}
                    />
                  </div>
                </div>
                <div className="ak-height-50 ak-height-lg-50"></div>
              </div>
            ))}
          </div>
          <div className="mb-5 order-md-0 order-3">
            <h2 className="ak-primary-color text-center mb-4">
              {allSection?.title}
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: allSection?.details,
              }}
            />
          </div>
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
