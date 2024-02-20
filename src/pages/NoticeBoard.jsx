import React, { useEffect, useRef } from "react";
import DataTable from "datatables.net-dt";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";
import ErrorShow from "../components/UI/ErrorShow";
import HomeLoading from "../components/UI/HomeLoading";
import { useGetNoticeListQuery } from "../features/notice/noticeApiInject";

export default function NoticeBoard() {
  const myTable = useRef(null);
  let content = null;

  const {
    data: noticeList,
    isLoading,
    isError,
    isSuccess,
  } = useGetNoticeListQuery();

  useEffect(() => {
    let table = new DataTable(myTable.current, {
      retrieve: true,
    });
  }, [isSuccess]);

  if (isLoading) {
    content = <HomeLoading />;
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && noticeList?.result.length < 0) {
    content = <ErrorShow message={"No data found"} />;
  }
  if (!isLoading && !isError && noticeList?.result.length > 0) {
    content = (
      <table ref={myTable} className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Notice Name</th>
            <th scope="col">Published Date</th>
            <th scope="col">Closing Date</th>
            <th scope="col" className=" text-center">
              Document
            </th>
          </tr>
        </thead>
        <tbody>
          {noticeList?.result.map((data, index) => (
            <tr key={index}>
              <th>{data.id}</th>
              <td>{data.notice_name}</td>
              <td> {data.published_date}</td>
              <td> {data.closing_date}</td>
              <td className="text-center">
                <Link
                  to={`http://174.138.171.172:3000/notice_board/${data.document}`}
                  className="text-danger"
                  target="_blank"
                >
                  <FaFilePdf />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-40"></div>
      <h2 className="table-title">Notice Board</h2>
      <div className="ak-height-30 ak-height-lg-30"></div>
      <div className="">{content}</div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
