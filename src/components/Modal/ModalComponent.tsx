import React, { createRef, useEffect } from "react";
import { Item } from "../../data/items/types";
import styles from "./ModalComponent.module.scss";

const ModalComponent = ({
  isOpen,
  setIsModalOpen,
  searchResult,
}: {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchResult: { item: Item }[];
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
      <div>
        {searchResult.map(
          ({ item }) =>
            item.favourite && (
              <div key={item.id} className={styles.favourite}>
                <div className={styles.favourite__container}>
                  <img
                    className={styles.favourite__container__image}
                    src={item.image}
                    alt={`Imagen de ${item.title}`}
                  />
                  <div className={styles.favourite__container__options}>
                    <h3>{item.title}</h3>
                    <button>🗑</button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      <div className="interacte">
        <button className="modal-btn" onClick={() => setIsModalOpen(!isOpen)}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default ModalComponent;
