import { useGetExpeirGenaralMembersListQuery } from "../../features/member/memberApiIn";
import ErrorShow from "../UI/ErrorShow";
import HomeLoading from "../UI/HomeLoading";

export default function ExpeirGenaralMember({ id }) {
  const {
    data: singalExpeirMember,
    isLoading,
    isError,
  } = useGetExpeirGenaralMembersListQuery(id);

  let content = null;

  if (isLoading) {
    content = (
      <div className="d-flex flex-column align-items-center my-5">
        <HomeLoading />
        <div className="mt-4"></div>
      </div>
    );
  }

  if (isError) {
    content = <ErrorShow message={"There was an error"} />;
  }

  if (
    !isLoading &&
    !isError &&
    (!singalExpeirMember ||
      !singalExpeirMember.success ||
      singalExpeirMember.data.length === 0)
  ) {
    content = (
      <>
        <span className={`badge bg-danger text-uppercase`}>Unpaid Member</span>
      </>
    );
  }

  if (
    !isLoading &&
    singalExpeirMember?.success &&
    singalExpeirMember.data.length > 0
  ) {
    const member = singalExpeirMember.data[0]; // assuming single member
    const { last_payment_date, expire_date, status } = member;

    content = (
      <div className=" my-4">
        <div className="card">
          <div className="card-body">
            <p className="mb-1">
              <strong>Last Payment:</strong> {last_payment_date}
            </p>
            <p className="mb-1">
              <strong>Expire Date:</strong> {expire_date}
            </p>
            <span
              className={`badge ${
                status === "Expired" ? "bg-danger" : "bg-success"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return content;
}
