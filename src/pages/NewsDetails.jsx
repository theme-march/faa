import React from "react";
import SocialLink from "../components/SocialLink/SocialLink";
import CommonHero from "../components/CommonHero/CommonHero";
import { useParams } from "react-router-dom";
import { useGetNewsDetailsIdQuery } from "../features/news/newsApilnject";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

export default function NewsDetails() {
  const { id } = useParams();

  const {
    data: newsDetails,
    isLoading,
    isError,
    isSuccess,
  } = useGetNewsDetailsIdQuery(id);

  let content = null;
  if (isLoading && id) {
    content = <HomeLoading />;
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && newsDetails?.success === false) {
    content = <ErrorShow message={"No data found"} />;
  }

  if (!isLoading && !isError && newsDetails?.success === true && isSuccess) {
    const { title, cover_image, details } = newsDetails.result;

    content = (
      <>
        <CommonHero title={"News Details"} />
        <div className="container container-max-width-910">
          <div className="ak-height-80 ak-height-lg-40"></div>
          <h2 className="new-details-page-title">{title}</h2>
          <div className="ak-height-30 ak-height-lg-30"></div>
          <div className="news-details-cover-img">
            <img
              src={`http://174.138.171.172:3000/publication/${cover_image}`}
              alt="..."
              className="mb-4 ak-center"
            />
          </div>
          <div className="ak-height-40 ak-height-lg-30"></div>
          <div
            dangerouslySetInnerHTML={{
              __html: details,
            }}
          />

          <div className="ak-height-40 ak-height-lg-30"></div>
          <div className="ak-border-width"></div>
          <div className="ak-height-40 ak-height-lg-30"></div>
          <SocialLink />
          <div className="ak-height-100 ak-height-lg-60"></div>
        </div>
      </>
    );
  }

  return content;
}
