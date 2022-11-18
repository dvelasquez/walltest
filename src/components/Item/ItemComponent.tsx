import React from "react";
import { Item } from "../../data/items/types";
import style from "./ItemComponent.module.scss";

const ItemComponent: React.FC<{
  item: Item;
  handleFavourite: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ item, handleFavourite }) => {
  return (
    <div className={style.item} data-testid="item-component">
      <h2>{item.title}</h2>
      <img
        src={item.image}
        loading="lazy"
        className={style.item__image}
        decoding="async"
      />
      <p>Description: {item.description}</p>
      <p>Email: {item.email}</p>
      <p>Price: {item.price}</p>
      <p style={{ padding: "4px" }}>
        <button onClick={handleFavourite}>
          Favorite {item.favourite ? "♥" : "♡"}
        </button>
      </p>
    </div>
  );
};

export default ItemComponent;
