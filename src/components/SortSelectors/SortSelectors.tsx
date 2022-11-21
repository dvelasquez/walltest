import React from "react";
import styles from "./SortSelectors.module.scss";

const SortSelectors = ({
  handleSortChange,
}: {
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <>
      <select
        name="sort-field"
        id="sort-field"
        data-testid="select-sort-field"
        onChange={handleSortChange}
        className={styles.sort__select}
      >
        <option value="title">Titulo</option>
        <option value="price">Precio</option>
        <option value="description">Descripcion</option>
        <option value="email">E-Mail</option>
      </select>
      <select
        name="sort-order"
        id="sort-order"
        data-testid="select-sort-order"
        onChange={handleSortChange}
        className={styles.sort__select}
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </>
  );
};

export default SortSelectors;
