import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";

import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal");

function Modal({ children, onClose, show, title }) {
  const modalRef = useRef();

  useEffect(() => {
    if (show) {
      modalRef.current.style.top = `${window.scrollY}px`;

      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = "fixed";
    } else {
      modalRef.current.style.top = `-100vh`;

      const scroll = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";

      window.scrollTo(0, -parseInt(scroll || "0"));
    }
  }, [show]);

  function clickOutsideHandler(event) {
    if (event.target.classList.contains(styles.modalWraper)) {
      onClose();
    }
  }

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      className={`${styles.modalWraper} ${show && styles.show}`}
      onClick={clickOutsideHandler}
    >
      <div className={styles.modal}>
        <div className={styles.modalTitle}>
          <h1>{title ?? "Title"}</h1>
          <button onClick={onClose}></button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
