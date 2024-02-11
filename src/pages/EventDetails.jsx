import React from "react";
import { ButtonPrimary } from "../components/Button/Button";
import SocialLink from "../components/SocialLink/SocialLink";
import CommonHero from "../components/CommonHero/CommonHero";
import { useParams } from "react-router-dom";
import { useGetEventDetailsIdQuery } from "../features/events/eventsApiInject";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

export default function EventDetails() {
  const { id } = useParams();
  const {
    data: eventsDetailsData,
    isLoading,
    isError,
  } = useGetEventDetailsIdQuery(id);
  console.log(eventsDetailsData);
  let content;
  if (isLoading) {
    content = <HomeLoading />;
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && eventsDetailsData?.success === false) {
    content = <ErrorShow message={"Event not found"} />;
  }

  if (!isLoading && !isError && eventsDetailsData?.success === true) {
    content = (
      <>
        <h2 className="mb-4">{eventsDetailsData?.result[0]?.event_title}</h2>
        <div className="gallery">
          {eventsDetailsData?.media.map((media, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={`http://174.138.171.172:3000/event_image/${media?.image}`}
                alt="..."
                className="ak-img"
              />
            </div>
          ))}
        </div>
        <div className="ak-height-50 ak-height-lg-30"></div>
        <div
          dangerouslySetInnerHTML={{
            __html: eventsDetailsData?.result[0]?.event_details,
          }}
        />
      </>
    );
  }
  return (
    <>
      <CommonHero title={"Event Details"} />
      <div className="ak-height-80 ak-height-lg-60"></div>
      <div className="container container-max-width-910">
        {content}
        <div className="ak-height-50 ak-height-lg-30"></div>
        <SocialLink />
        <div className="ak-height-60 ak-height-lg-30"></div>
        <div className="d-flex gap-3">
          <ButtonPrimary to={`/event-participate-registration/${id}`}>
            Register For Event
          </ButtonPrimary>

          <ButtonPrimary to={`/event-sponsor-registration/${id}`}>
            Sponsor Now
          </ButtonPrimary>
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
