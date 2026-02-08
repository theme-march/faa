
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGetHomePopupQuery } from "../../features/home/homeApiIn";

export default function AddModal() {
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useGetHomePopupQuery();

  /* ================= SHOW MODAL ONLY IF DATA EXISTS ================= */
  useEffect(() => {
    if (isLoading) return;

    const popupItem = data?.result?.[0];
    if (!popupItem) return; 

    const hasVisitedBefore =
      sessionStorage.getItem("hasVisitedBefore");

    if (!hasVisitedBefore) {
      setShowModal(true);
      sessionStorage.setItem("hasVisitedBefore", "true");
    }
  }, [data, isLoading]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  /* ================= SAFETY CHECK ================= */
  if (!data?.result?.[0]) {
    return null; // ✅ nothing render
  }

  const popup = data.result[0];

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      className="m-0 p-0"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{popup.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {popup.image && (
          <img
            src={`/images/home_popup_image/${popup.image}`}
            className="add-images-home"
            alt={popup.title}
          />
        )}

        {popup.details && (
          <p className="my-3">{popup.details}</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          className="button-primary"
          onClick={handleCloseModal}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
