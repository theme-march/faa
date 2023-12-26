import React, { useEffect, useRef } from "react";
import DataTable from "datatables.net-dt";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";

export default function NoticeBoard() {
  const myTable = useRef(null);
  useEffect(() => {
    let table = new DataTable(myTable.current, {
      retrieve: true,
    });
  }, []);

  const datas = [
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
    {
      id: "1",
      desp: "Lorem Ipsum is simply dummy text of the printing industry.",
      published: "2023-10-12",
      closing: "2023-10-12",
      document: "Document",
    },
  ];

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-40"></div>
      <h2 className="table-title">Notice Board</h2>
      <div className="ak-height-30 ak-height-lg-30"></div>
      <div className="">
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
            {datas?.map((data, index) => (
              <tr key={index}>
                <th>{data.id}</th>
                <td>{data.desp}</td>
                <td> {data.published}</td>
                <td> {data.closing}</td>
                <td className="text-center">
                  <Link
                    to={"https://ssl.du.ac.bd/public/images/_1703047539.pdf"}
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
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
