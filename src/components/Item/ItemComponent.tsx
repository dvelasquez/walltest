import React from "react";
import { Item } from "../../data/items/types";
import style from "./ItemComponent.module.scss";

const ItemComponent: React.FC<Item> = (item) => {
  return (
    <div className={style.item} data-testid="item-component">
      <h1>{item.title}</h1>
      <img src={item.image} loading="lazy" className={style.item__image} />
      <p>Description: {item.description}</p>
      <p>Email: {item.email}</p>
      <p>Price: {item.price}</p>
    </div>
  );
};

export default ItemComponent;
