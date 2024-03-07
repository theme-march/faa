import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import addImages from "../../assets/addshow/addphoto.jpg";

export default function AddModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setShowModal(true);
      sessionStorage.setItem("hasVisitedBefore", true);
    }
  }, [showModal]);

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
        <Modal.Title>Smart ICT LAB</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={addImages} className="add-images-home" />
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-primary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
