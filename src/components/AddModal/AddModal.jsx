import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGetHomePopupQuery } from "../../features/home/homeApiIn";

export default function AddModal() {
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetHomePopupQuery();

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setShowModal(true);
      sessionStorage.setItem("hasVisitedBefore", true);
    }
  }, [showModal, data]);

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
        <Modal.Title>{data?.result[0]?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`/images/home_popup_image/${data?.result[0]?.image}`}
          className="add-images-home"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-primary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
