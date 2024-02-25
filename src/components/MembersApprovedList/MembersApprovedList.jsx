import React, { useEffect, useState, useCallback } from "react";
import {
  useGetMemberDetailsIdQuery,
  useMemberApprovedMutation,
  useMemberListApprovedMutation,
} from "../../features/member/memberApiIn";
import { toast } from "react-toastify";

export default function MembersApprovedList() {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const { data: loginUserData } = useGetMemberDetailsIdQuery(loginUser?.id);
  const [sameSessionUsers, setSameSessionUsers] = useState(null);
  const [memberListApproved] = useMemberListApprovedMutation();
  const [memberApproved] = useMemberApprovedMutation();

  const fetchData = useCallback(async () => {
    const data = {
      user_id: loginUser?.id,
      session: loginUser?.session,
    };
    const resp = await memberListApproved(data);
    setSameSessionUsers(resp.data.result);
  }, [loginUser?.id, loginUser?.session, memberListApproved]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMemberApproval = useCallback(
    async (memberId) => {
      const data = {
        register_member_id: loginUser.id,
        member_id: memberId,
      };
      const response = await memberApproved(data);

      if (response?.data?.success !== true) {
        toast.info(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1200,
        });
      }

      fetchData();
    },
    [fetchData, loginUser.id, memberApproved]
  );

  const renderTableHeaders = (isAdminApproval) => {
    return (
      <tr>
        <th scope="col">User Id</th>
        <th scope="col">Name</th>
        <th scope="col">Mobile</th>
        <th scope="col">Email</th>
        <th scope="col">Session</th>
        {isAdminApproval && <th scope="col">Admin Approved</th>}
        {!isAdminApproval && (
          <th scope="col" className="text-center">
            Action
          </th>
        )}
      </tr>
    );
  };

  function filterById(arr1, arr2) {
    if (arr1 && arr2) {
      const idSet = new Set(arr2?.map((obj) => obj.id));
      return arr1.filter((obj) => idSet.has(obj.id));
    } else {
      return [];
    }
  }
  const filteredArray = filterById(
    sameSessionUsers,
    loginUserData?.approval_list
  );
  console.log(filteredArray);

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-40"></div>
      {loginUser?.admin_approval === 1 && (
        <div className="row">
          <table className="table table-hover table-striped">
            <thead>{renderTableHeaders(false)}</thead>
            <tbody>
              {sameSessionUsers?.map((data, index) => (
                <tr key={index}>
                  <th>{data.id}</th>
                  <td>{data.name}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.email}</td>
                  <td>{data.session}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleMemberApproval(data.id)}
                    >
                      {data.status === 1 ? "I Know" : "OK"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {loginUser?.admin_approval === 0 && (
        <>
          <div className="ak-height-80 ak-height-lg-40"></div>
          <h3 className="mb-3">Approved Members</h3>
          <div className="row">
            <table className="table table-hover table-striped">
              <thead>{renderTableHeaders(true)}</thead>
              <tbody>
                {filteredArray?.map((data, index) => (
                  <tr key={index}>
                    <th>{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.phone_number}</td>
                    <td>{data.email}</td>
                    <td>{data.session}</td>
                    <td className="text-center">
                      <button className="btn btn-primary btn-sm disabled">
                        Pending
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
