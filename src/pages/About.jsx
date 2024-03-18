import React, { useEffect, useState } from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import usePagesDetails from "../hook/usePagesDetails";
import Shimmer from "../components/Shimmer/Shimmer";
import { useGetAboutUsMessageQuery } from "../features/pageDetails/pageDetails";

export default function About() {
  const pagesDetails = usePagesDetails();
  const [allsection, setallSection] = useState({});

  const { data } = useGetAboutUsMessageQuery();

  function handreler(id) {
    let content = pagesDetails?.result?.find((element) => element.id == id);
    setallSection(content);
  }

  useEffect(() => {
    if (!allsection?.title) {
      setallSection(pagesDetails?.result[0]);
    }
  }, [allsection, pagesDetails]);

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
              <div className="d-flex flex-column gap-3">{content}</div>
            </div>
          </div>
          <div className="col-md-10 order-md-0 order-1">
            {data?.result?.map((elem) => (
              <>
                <div className="about-pages-section-one">
                  <div className="profiles">
                    <div>
                      <img
                        src={`/images/about_us_message_image/${elem?.image}`}
                        alt="Dr. Mahmood Osman Imam"
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
                <div className="ak-height-50 ak-height-lg-50"></div>{" "}
              </>
            ))}
          </div>
          <div className="mb-5 order-md-0 order-3">
            <h2 className="ak-primary-color text-center mb-4">
              {allsection?.title}
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: allsection?.details,
              }}
            />
          </div>
        </div>
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
