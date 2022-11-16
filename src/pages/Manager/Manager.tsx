import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../../components/Layout/LayoutComponent";
import ItemComponent from "../../components/Item/ItemComponent";
import { getItems } from "../../data/items";
import { ItemsResponse, Item } from "../../data/items/types";
import useSearch, { DEFAULT_SEARCH_OPTIONS } from "../../hooks/useSearch";
import ItemNotFoundComponent from "../../components/Item/ItemNotFoundComponent";

const ManagerPage: React.FC = () => {
  const [data, setData] = useState<ItemsResponse | null>(null);
  const [paginatedResults, setPaginatedResults] = useState<{ item: Item }[]>(
    []
  );
  const [lastItem, setLastItem] = useState<number>(0);
  const search = useContext(SearchContext);

  // This hook is used to fetch the items from the API and only runs once
  useEffect(() => {
    getItems().then((response) => {
      setData(response);
    });
  }, []);

  // Every time the search context changes, we reset the pagination
  useEffect(() => {
    setLastItem(0);
  }, [search]);

  // Update the results when the search context changes
  const searchResult = useSearch<Item>(
    data?.items || [],
    search || "",
    DEFAULT_SEARCH_OPTIONS
  );

  // Update the pagination when the search results change
  useEffect(() => {
    // Paginate only if this is the first time we are rendering the results
    // and if we have more than 5 results
    if (searchResult.length > 5 && lastItem === 0) {
      const nextLastItem = lastItem + 5;
      setPaginatedResults(searchResult.slice(lastItem, nextLastItem));
      setLastItem(nextLastItem);
    }
    // reset the pagination if the search results change
    else if (searchResult.length > 0 && searchResult.length <= 5) {
      setPaginatedResults(searchResult);
      setLastItem(0);
    } else if (searchResult.length === 0 && search.length > 0) {
      setPaginatedResults([]);
      setLastItem(0);
    }
  }, [searchResult, lastItem, search]);

  // Paginate the results, adding 5 more items to the list until everything is shown
  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextLastItem = lastItem + 5;
    setPaginatedResults([
      ...paginatedResults,
      ...searchResult.slice(lastItem, nextLastItem),
    ]);
    setLastItem(nextLastItem);
  };

  return (
    <div data-testid="item-manager-list">
      {paginatedResults.length > 0 ? (
        paginatedResults.map(({ item }) => (
          <ItemComponent
            key={item.id}
            id={item.id}
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
      {lastItem <= paginatedResults.length ? (
        <>
          <button data-testid="button-load-more" onClick={handleLoadMore}>
            Cargar mas
          </button>
        </>
      ) : (
        <p>No hay mas resultados</p>
      )}
    </div>
  );
};

export default ManagerPage;
