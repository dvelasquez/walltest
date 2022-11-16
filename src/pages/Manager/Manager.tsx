import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../../components/Layout/LayoutComponent";
import ItemComponent from "../../components/Item/ItemComponent";
import { getItems } from "../../data/items";
import { ItemsResponse, Item } from "../../data/items/types";
import useSearch, { DEFAULT_SEARCH_OPTIONS } from "../../hooks/useSearch";
import ItemNotFoundComponent from "../../components/Item/ItemNotFoundComponent";

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
    <div data-testid="item-manager-list">
      {searchResult.length > 0 ? (
        searchResult.map(({ item }, i) => (
          <ItemComponent
            key={i}
            title={item.title}
            description={item.description}
            image={item.image}
            email={item.email}
            price={item.price}
          />
        ))
      ) : (
        <ItemNotFoundComponent />
      )}
    </div>
  );
};

export default ManagerPage;
