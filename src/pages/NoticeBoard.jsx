import React, { useEffect, useRef, useMemo } from "react";
import DataTable from "datatables.net-dt";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";
import ErrorShow from "../components/UI/ErrorShow";
import HomeLoading from "../components/UI/HomeLoading";
import { useGetNoticeListQuery } from "../features/notice/noticeApiInject";

export default function NoticeBoard() {
  const myTable = useRef(null);
  const {
    data: noticeList,
    isLoading,
    isError,
    isSuccess,
  } = useGetNoticeListQuery();

  useEffect(() => {
    if (isSuccess) {
      const table = new DataTable(myTable.current, {
        retrieve: true,
      });
      return () => {
        table.destroy(); // Destroy the DataTable instance when unmounting
      };
    }
  }, [isSuccess]);

  const memoizedNoticeList = useMemo(() => noticeList, [noticeList]);
  const tableContent = useMemo(() => {
    if (isLoading) return <HomeLoading />;
    if (isError) return <ErrorShow message={"There was an error"} />;
    if (!memoizedNoticeList || memoizedNoticeList.result.length === 0)
      return <ErrorShow message={"No data found"} />;

    return (
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
          {memoizedNoticeList.result.map((data) => (
            <tr key={data.id}>
              <th>{data.id}</th>
              <td>{data.notice_name}</td>
              <td>{data.published_date}</td>
              <td>{data.closing_date}</td>
              <td className="text-center">
                <Link
                  to={`/images/notice_board/${data.document}`}
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
  }, [isLoading, isError, memoizedNoticeList]);

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-40" />
      <h2 className="table-title">Notice Board</h2>
      <div className="ak-height-30 ak-height-lg-30" />
      {tableContent}
      <div className="ak-height-100 ak-height-lg-60" />
    </div>
  );
}
