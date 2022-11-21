import React, { createRef, useEffect, useState } from "react";
import { Item } from "../../data/items/types";
import useSearch, { DEFAULT_SEARCH_OPTIONS } from "../../hooks/useSearch";
import FavouriteItem from "../FavouriteItem/FavouriteItem";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./ModalComponent.module.scss";

const ModalComponent = ({
  isOpen,
  setIsModalOpen,
  searchResult,
  favouritedItems,
}: {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchResult: { item: Item }[];
  favouritedItems: { id: number; isFavourite: boolean }[];
}) => {
  const ref = createRef<HTMLDialogElement>();
  const pageBody = document.querySelector("body");
  const [search, setSearch] = useState<string>("");

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

  const list: Item[] = searchResult.map((item) => item.item);

  const filteredResults = useSearch({
    list,
    searchTerm: search,
    favouritedItems,
    sortBy: "title",
    orderBy: "asc",
    fuseOptions: {
      ...DEFAULT_SEARCH_OPTIONS,
      keys: ["title"],
    },
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <dialog ref={ref} className={styles.dialog} data-testid="modal-container">
      <div className={styles.dialog__container}>
        <h2>Lista Favoritos</h2>
        <div>
          <SearchBar
            search={search}
            handleSearchChange={handleSearchChange}
            testId="modal"
          />
        </div>
        <div className={styles.dialog__list}>
          {filteredResults.map(
            ({ item }) =>
              item.favourite && <FavouriteItem key={item.id} item={item} />
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
