import React from "react";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";
import { useGetMilestoneProgramQuery } from "../features/home/homeApiIn";
import CommonHero from "../components/CommonHero/CommonHero";
import ProgramItem from "../components/Programs/ProgramItem";

export default function AllPrograms() {
  const { data: eventList, isLoading, isError } = useGetMilestoneProgramQuery();

  let content = null;
  if (isLoading) {
    content = [1, 2, 3, 4, 5, 6].map((event, i) => <HomeLoading key={i} />);
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"Item not found"} />;
  }

  if (!isLoading && !isError && eventList?.success === false) {
    content = <ErrorShow message={"Event not found"} />;
  }

  if (!isLoading && !isError && eventList?.success === true) {
    content = eventList?.result?.map((event) => (
      <ProgramItem key={event.id} props={event} />
    ));
  }

  return (
    <div>
      <CommonHero title={"Programs"} />
      <div className="ak-height-60 ak-height-lg-60"></div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {content}
        </div>
        <div className="ak-height-40 ak-height-lg-30"></div>
      </div>
      <div className="ak-height-60 ak-height-lg-60"></div>
    </div>
  );
}
