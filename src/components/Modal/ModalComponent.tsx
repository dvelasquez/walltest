import React, { createRef, useEffect } from "react";
import styles from "./ModalComponent.module.scss";

const ModalComponent = ({
  isOpen,
  setIsModalOpen,
}: {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = createRef<HTMLDialogElement>();
  const pageBody = document.querySelector("body");

  useEffect(() => {
    if (pageBody) {
      if (isOpen) {
        const scrollY =
          document.documentElement.style.getPropertyValue("--scroll-y");
        ref.current?.showModal();
        pageBody.style.position = "fixed";
        pageBody.style.top = `-${scrollY}`;
      } else {
        ref.current?.close();
        pageBody?.classList.remove(styles.modalOpen);
        const scrollY = pageBody.style.top;
        pageBody.style.position = "";
        pageBody.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isOpen, ref, pageBody]);

  return (
    <dialog ref={ref} className={styles.dialog}>
      <h2>This is my first modal after all</h2>
      <h3>Im going to use the dialog element</h3>
      <mark>Definiton of a the dialog element based on HTML 5.2 spec</mark>
      <blockquote>
        The <code>dialog</code> element represents a part of an application that
        a user interacts with to perform a task, for example a dialog box,
        inspector, or window.
      </blockquote>
      <div className="interacte">
        <button className="modal-btn" onClick={() => setIsModalOpen(!isOpen)}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default ModalComponent;
