import React from "react";
import { Item } from "../../data/items/types";
import style from "./ItemComponent.module.scss";

const ItemComponent: React.FC<{
  item: Item;
  handleFavourite: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ item, handleFavourite }) => {
  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(parseFloat(item.price));

  return (
    <div className={style.item} data-testid="item-component">
      <div className={style.item__section}>
        <img
          height="253px"
          src={item.image}
          loading="lazy"
          className={style.item__image}
          decoding="async"
        />
      </div>
      <span
        className={style.item__section}
        style={{ fontWeight: "bold", fontSize: "14px" }}
      >
        {currency}
        <button
          onClick={handleFavourite}
          data-testid="item-favourite-button"
          data-state={
            item.favourite ? "favourite-active" : "favourite-inactive"
          }
          className={style.item__section__favourite_button}
        >
          {item.favourite ? "♥" : "♡"}
        </button>
      </span>
      <span className={`${style.item__section} ${style.item__section__title}`}>
        {item.title}
      </span>
      <p
        className={style.item__section}
        style={{ fontSize: 12, fontWeight: 400 }}
      >
        <a href={`mailto:${item.email}`}>{item.email}</a>
      </p>
      <div className={style.item__section}>
        <p className={style.item__section__description}>{item.description}</p>
      </div>
    </div>
  );
};

export default ItemComponent;
