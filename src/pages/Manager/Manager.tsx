import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../../components/Layout/LayoutComponent";
import ItemComponent from "../../components/Item/ItemComponent";
import { getItems } from "../../data/items";
import { ItemsResponse, Item, ItemField } from "../../data/items/types";
import useSearch, { DEFAULT_SEARCH_OPTIONS } from "../../hooks/useSearch";
import ItemNotFoundComponent from "../../components/Item/ItemNotFoundComponent";
import ModalComponent from "../../components/Modal/ModalComponent";

const ManagerPage: React.FC = () => {
  const [data, setData] = useState<ItemsResponse | null>(null);
  const [paginatedResults, setPaginatedResults] = useState<{ item: Item }[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOptions, setSortOptions] = useState<{
    sortBy: ItemField;
    orderBy: "asc" | "desc";
  }>({
    sortBy: "title",
    orderBy: "asc",
  });
  const [lastItem, setLastItem] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

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

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  // Update the results when the search context changes
  const searchResult = useSearch<Item>({
    list: data?.items || [],
    searchTerm: search || "",
    sortBy: sortOptions.sortBy,
    orderBy: sortOptions.orderBy,
    fuseOptions: DEFAULT_SEARCH_OPTIONS,
  });

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
  }, [searchResult, lastItem, search, scrollPosition]);

  // Paginate the results, adding 5 more items to the list until everything is shown
  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setScrollPosition(window.pageYOffset);
    const nextLastItem = lastItem + 5;
    setPaginatedResults([
      ...paginatedResults,
      ...searchResult.slice(lastItem, nextLastItem),
    ]);
    setLastItem(nextLastItem);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.id === "sort-field") {
      setSortOptions({
        ...sortOptions,
        sortBy: e.target.value as ItemField,
      });
    } else if (e.target.id === "sort-order") {
      setSortOptions({
        ...sortOptions,
        orderBy: e.target.value as "asc" | "desc",
      });
    }
    setLastItem(0);
  };

  return (
    <>
      <div data-testid="item-sorter">
        <select
          name="sort-field"
          id="sort-field"
          data-testid="select-sort-field"
          onChange={handleSortChange}
        >
          <option value="title">Titulo</option>
          <option value="price">Precio</option>
          <option value="description">Descripcion</option>
          <option value="email">E-Mail</option>
        </select>
        <select
          name="sort-order"
          id="sort-order"
          data-testid="select-sort-order"
          onChange={handleSortChange}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <button onClick={() => setIsModalOpen(!isModalOpen)}>open modal</button>
        <ModalComponent
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        ></ModalComponent>
      </div>
      <div data-testid="item-manager-list">
        {paginatedResults.length > 0 ? (
          paginatedResults.map(({ item }) => (
            <ItemComponent key={item.id} item={item} />
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
    </>
  );
};

export default ManagerPage;
