import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpenModal, setShowModal, children, className }) => {
  const escFunction = event => {
    if (event.keyCode === 27) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    if (isOpenModal) {
      document.addEventListener("keydown", escFunction, false);
    }

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });
  return (
    createPortal(
      <div
        onClick={e => {
          if (e.target.id === "modalContainer") { setShowModal(false); }
        }}
        className={className}
        id="modalContainer"
      >
        {children}
      </div>,
      document.body,
    )
  );
};
export default Modal;
