import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGetHomePopupQuery } from "../../features/home/homeApiIn";

function getAdminBaseUrl() {
  return (import.meta.env.VITE_ADMIN_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
}

export default function AddModal() {
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useGetHomePopupQuery();

  const popup = useMemo(() => {
    const rows = Array.isArray(data?.result) ? data.result : [];
    if (!rows.length) return null;
    return rows[0];
  }, [data]);

  useEffect(() => {
    if (isLoading || !popup) return;

    const popupKey = `home_popup_seen_${popup.id}_${popup.updated_at || popup.created_at || ""}`;
    const hasSeenThisPopup = sessionStorage.getItem(popupKey);

    if (!hasSeenThisPopup) {
      setShowModal(true);
      sessionStorage.setItem(popupKey, "true");
    }
  }, [isLoading, popup]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!popup) return null;

  const popupImage = popup.image
    ? `${getAdminBaseUrl()}/images/home_popup_image/${popup.image}`
    : "";

  return (
    <Modal show={showModal} onHide={handleCloseModal} className="m-0 p-0" centered>
      <Modal.Header closeButton>
        <Modal.Title>{popup.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {popupImage && <img src={popupImage} className="add-images-home" alt={popup.title} />}
        {popup.details && <p className="my-3">{popup.details}</p>}
      </Modal.Body>

      <Modal.Footer>
        <Button className="button-primary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
