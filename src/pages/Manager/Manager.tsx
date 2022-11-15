import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../../components/Layout/LayoutComponent";
import ItemComponent from "../../components/Item/ItemComponent";
import { getItems } from "../../data/items";
import { ItemsResponse, Item } from "../../data/items/types";
import useSearch, { DEFAULT_SEARCH_OPTIONS } from "../../hooks/useSearch";

const ManagerPage: React.FC = () => {
  const [data, setData] = useState<ItemsResponse | null>(null);
  const search = useContext(SearchContext);

  useEffect(() => {
    getItems().then((response) => setData(response));
  }, []);

  const searchResult = useSearch<Item>(
    data?.items || [],
    search || "",
    DEFAULT_SEARCH_OPTIONS
  );

  return (
    <>
      {searchResult.length > 0 &&
        searchResult.map(({ item }, i) => (
          <ItemComponent key={i} {...item}></ItemComponent>
        ))}
    </>
  );
};

export default ManagerPage;
