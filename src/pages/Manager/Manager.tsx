import React, { useEffect, useState } from "react";
import ItemComponent from "../../components/Item/ItemComponent";
import { getItems } from "../../data/items";
import { ItemsResponse } from "../../data/items/types";

const ManagerPage = () => {
  const [data, setData] = useState<ItemsResponse | null>(null);

  useEffect(() => {
    getItems().then((response) => setData(response));
  }, []);

  return (
    <>
      {data?.items.map((item, i) => (
        <ItemComponent key={i} {...item}></ItemComponent>
      ))}
    </>
  );
};

export default ManagerPage;
