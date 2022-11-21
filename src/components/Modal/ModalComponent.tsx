import React, { createRef, useEffect } from "react";
import styles from "./ModalComponent.module.scss";

const ModalComponent = ({
  isOpen,
  setIsModalOpen,
  children,
}: {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const ref = createRef<HTMLDialogElement>();
  const pageBody = document.querySelector("body");

  useEffect(() => {
    if (pageBody) {
      if (isOpen) {
        const scrollY =
          document.documentElement.style.getPropertyValue("--scroll-y");
        if (!ref.current?.open) ref.current?.showModal();
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
    <dialog ref={ref} className={styles.dialog} data-testid="modal-container">
      <div className={styles.dialog__container}>
        {children}
        <div className={styles.dialog__footer}>
          <button
            data-testid="modal-close"
            className={styles.dialog__footer__close}
            onClick={() => setIsModalOpen(!isOpen)}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalComponent;
