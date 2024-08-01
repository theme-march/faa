import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

export default function ShowRegisterMessages({ isSuccess, respDataSuccess }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);
    }
  }, [isSuccess]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      className="m-0 p-0"
      centered
    >
      <Modal.Header closeButton>
        {respDataSuccess?.data?.success ? (
          <Modal.Title>Register Successfully!</Modal.Title>
        ) : (
          <Modal.Title>Member Email Already Registered!</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <div>
          {respDataSuccess?.data?.success ? (
            <>
              <p>Register Successfully!. Please Pay Your fees</p>
              <Link
                to={`/members-payment/${respDataSuccess?.data?.result?.id}`}
                className="button-primary mt-4"
              >
                Pay Your Fees
              </Link>
            </>
          ) : (
            <>
              <p>
                Member Email Already Registered!. Please Add Your New Email Or
                Sign In
              </p>
              <Link to={`/singin`} className="button-primary mt-4">
                Sign In
              </Link>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-sm" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
