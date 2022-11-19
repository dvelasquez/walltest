import React, { createRef, useEffect } from "react";
import { Item } from "../../data/items/types";
import FavouriteItem from "../FavouriteItem/FavouriteItem";
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
    <dialog ref={ref} className={styles.dialog} data-testid="modal-container">
      <div className={styles.dialog__container}>
        <h2>Lista Favoritos</h2>
        <div className={styles.dialog__list}>
          {searchResult.map(
            ({ item }) => item.favourite && <FavouriteItem item={item} />
          )}
        </div>
        <div className={styles.dialog__footer}>
          <button className="modal-btn" onClick={() => setIsModalOpen(!isOpen)}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalComponent;
