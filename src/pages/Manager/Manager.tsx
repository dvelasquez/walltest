import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../../components/Layout/LayoutComponent";
import ItemComponent from "../../components/Item/ItemComponent";
import { getItems } from "../../data/items";
import { ItemsResponse, Item } from "../../data/items/types";
import useSearch from "../../hooks/useSearch";

const ManagerPage: React.FC = () => {
  const [data, setData] = useState<ItemsResponse | null>(null);
  const search = useContext(SearchContext);

  useEffect(() => {
    getItems().then((response) => setData(response));
  }, []);

  const filteredData = useSearch<Item>(data?.items || [], search || "", {
    findAllMatches: true,
    threshold: 0.2,
    keys: ["title", "description", "email"],
  });

  return (
    <>
      {filteredData.length > 0 &&
        filteredData.map(({ item }, i) => (
          <ItemComponent key={i} {...item}></ItemComponent>
        ))}
    </>
  );
};

export default ManagerPage;
