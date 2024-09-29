import React from "react";
import MovingText from "../../components/MovingText/MovingText";
import { Link } from "react-router-dom";
import { useGetScrollingNewListQuery } from "../../features/news/newsApilnject";

export default function TopHeader() {
  const { data, isLoading, isError, isSuccess } = useGetScrollingNewListQuery();
  let content;
  if (isLoading) {
    content = "Loding...";
  }
  if (!isLoading && isError) {
    content = "Item not found";
  }

  if (!isLoading && !isError) {
    content = "No data found";
  }

  if (!isLoading && !isError && isSuccess) {
    content = data?.result[0]?.title;
  }
  return (
    <div className="container">
      <div className="top-header">
        <MovingText>{content}</MovingText>
        <div className="d-flex align-items-center">
          <ul className="d-flex align-items-center gap-4 m-0">
            <li>
              <Link to={"/career"}>Career Resource</Link>
            </li>
            <li>
              <Link to={"/donation"}>Donation</Link>
            </li>
            <li>
              <Link to={"/faq"}>Help & FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
