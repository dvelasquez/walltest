import React from "react";
import { Item } from "../../data/items/types";
import styles from "./FavouriteItem.module.scss";

const FavouriteItem = ({ item }: { item: Item }) => {
  return (
    <div key={item.id} className={styles.favourite}>
      <div className={styles.favourite__container}>
        <img
          className={styles.favourite__container__image}
          src={item.image}
          alt={`Imagen de ${item.title}`}
        />
        <div className={styles.favourite__container__options}>
          <span className={styles.favourite__container__options__title}>
            {item.title}
          </span>
          <button className={styles.favourite__container__options__button}>
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteItem;
