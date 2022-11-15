import React from "react";
import { Item } from "../../data/items/types";
import style from "./ItemComponent.module.scss";

const ItemComponent: React.FC<Item> = (item) => {
  return (
    <div className={style.item}>
      <h1>{item.title}</h1>
      <p>Description: {item.description}</p>
      <p>Email: {item.email}</p>
      <p>Image: {item.image}</p>
      <p>Price: {item.price}</p>
    </div>
  );
};

export default ItemComponent;
