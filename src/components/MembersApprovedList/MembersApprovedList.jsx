import React, { useEffect, useState } from "react";
import {
  useGetMemberDetailsIdQuery,
  useMemberApprovedMutation,
  useMemberListApprovedMutation,
} from "../../features/member/memberApiIn";
import Shimmer from "../Shimmer/Shimmer";
import { toast } from "react-toastify";

export default function MembersApprovedList() {
  const [user, setUser] = useState({});

  const [memberListApproved, { data: sameSessionUsers }] =
    useMemberListApprovedMutation();
  const [memberApproved] = useMemberApprovedMutation();

  const { data: loginUserData } = useGetMemberDetailsIdQuery(user.id);
  console.log(loginUserData);
  useEffect(() => {
    const loginUser = JSON.parse(sessionStorage.getItem("user"));
    setUser(loginUser);
    const data = {
      user_id: loginUser?.id,
      session: loginUser?.session,
    };
    memberListApproved(data);
  }, []);

  let content;

  if (
    sameSessionUsers?.result?.length == undefined &&
    sameSessionUsers?.result == undefined
  ) {
    content = <Shimmer />;
  }

  if (sameSessionUsers?.result?.length > 0) {
    content = sameSessionUsers?.result?.map((data, index) => (
      <tr key={index}>
        <th>{data.id}</th>
        <td>{data.name}</td>
        <td>{data.phone_number}</td>
        <td>{data.email}</td>
        <td>{data.session}</td>
        <td className="text-center">
          <button
            className="btn btn-success btn-sm"
            onClick={() => handler(data.id)}
          >
            {data.status == 1 ? "I Know" : "ok"}
          </button>
        </td>
      </tr>
    ));
  }
  const handler = async (memberId) => {
    const data = {
      register_member_id: user.id,
      member_id: memberId,
    };
    const response = await memberApproved(data);
    memberListApproved(user);
    if (response?.data?.success != true) {
      toast.info(response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1200,
      });
    }
  };

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-40"></div>
      <div className="row">
        {user?.admin_approval == 1 && (
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Email</th>
                <th scope="col">Session</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        )}
      </div>
      <div className="ak-height-80 ak-height-lg-40"></div>
      <div className="row">
        {loginUserData?.result?.admin_approval == 0 && (
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Email</th>
                <th scope="col">Session</th>
                <th scope="col">Approved Members</th>
                <th scope="col">Admin Approved</th>
              </tr>
            </thead>
            <tbody>
              {loginUserData?.approval_list?.map((data, index) => (
                <tr key={index}>
                  <th>{data.id}</th>
                  <td>{data.name}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.email}</td>
                  <td>{data.session}</td>
                  <td className="text-center">{data.count}</td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm disabled">
                      pedding
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
