import React from "react";
import { Item } from "../../data/items/types";
import style from "./ItemComponent.module.scss";

const ItemComponent: React.FC<{
  item: Item;
  handleFavourite: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ item, handleFavourite }) => {
  return (
    <div className={style.item} data-testid="item-component">
      <div className={style.item__section}>
        <img
          src={item.image}
          loading="lazy"
          className={style.item__image}
          decoding="async"
        />
      </div>
      <h2 className={style.item__section}>
        {item.price}
        {"€ "}
        <button onClick={handleFavourite}>
          Favorite {item.favourite ? "♥" : "♡"}
        </button>
      </h2>
      <h3 className={style.item__section}>{item.title}</h3>
      <p className={style.item__section} style={{ fontSize: 8 }}>
        {item.description}
      </p>
      <p className={style.item__section} style={{ fontSize: 8 }}>
        {item.email}
      </p>
    </div>
  );
};

export default ItemComponent;
