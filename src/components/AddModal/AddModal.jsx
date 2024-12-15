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
          src={`https://faa-dubd.org/images/home_popup_image/resized_home_popup_1734237306312.jpg`}
          // src={`/images/home_popup_image/${data?.result[0]?.image}`}
          className="add-images-home"
        />
        <p className="my-3">{data?.result[0]?.details}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-primary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
