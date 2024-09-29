import React from "react";
import { useGetMilestoneProgramIdQuery } from "../features/home/homeApiIn";
import { Link, useParams } from "react-router-dom";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";
import CommonHero from "../components/CommonHero/CommonHero";

export default function ProgramsDetails() {
  const { id } = useParams();

  const {
    data: singleMilestoneProgram,
    isLoading,
    isError,
  } = useGetMilestoneProgramIdQuery(id);

  let content = null;
  if (isLoading) {
    content = <HomeLoading />;
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"Item not found"} />;
  }

  if (!isLoading && !isError && singleMilestoneProgram?.success === false) {
    content = <ErrorShow message={"No data found"} />;
  }

  if (
    !isLoading &&
    !isError &&
    singleMilestoneProgram?.result[0] == undefined &&
    singleMilestoneProgram?.success === true
  ) {
    content = <ErrorShow message={"Item not found"} />;
  }

  if (
    !isLoading &&
    !isError &&
    singleMilestoneProgram?.success === true &&
    singleMilestoneProgram?.result[0] !== undefined
  ) {
    const { title, details, image } = singleMilestoneProgram?.result[0];
    content = (
      <>
        <CommonHero title={title.split(" ")[0]} />
        <div className="container container-max-width-910">
          <div className="ak-height-60 ak-height-lg-60"></div>
          <h2>{title}</h2>
          <div className="ak-height-60 ak-height-lg-30"></div>
          <img
            src={`/images/programs/${image}`}
            alt="..."
            className="mb-4 ak-center singleMilestoneProgram-img"
          />
          <div className="ak-height-30 ak-height-lg-30"></div>
          <p
            dangerouslySetInnerHTML={{
              __html: details,
            }}
          />
          <Link className="button-primary mb-md-5 mb-2 mt-5" to={"/donation"}>
            Donate
          </Link>
        </div>
        <div className="ak-height-60 ak-height-lg-60"></div>
      </>
    );
  }

  return content;
}
