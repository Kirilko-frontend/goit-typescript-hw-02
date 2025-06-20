import Modal from "react-modal";
import { useEffect } from "react";
import style from "./ImageModal.module.css";

interface Image {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image;
}

Modal.setAppElement("#root");

export default function ImageModal({
  isOpen,
  onClose,
  image,
}: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={style.modal}
      overlayClassName={style.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description ?? "Image"}
        className={style.modalImage}
      />
    </Modal>
  );
}
