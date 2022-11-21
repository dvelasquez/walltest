import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../../components/Layout/LayoutComponent";
import ItemComponent from "../../components/Item/ItemComponent";
import { getItems } from "../../data/items";
import { ItemsResponse, Item, ItemField } from "../../data/items/types";
import useSearch, { DEFAULT_SEARCH_OPTIONS } from "../../hooks/useSearch";
import ItemNotFoundComponent from "../../components/Item/ItemNotFoundComponent";
import ModalComponent from "../../components/Modal/ModalComponent";
import styles from "./Manager.module.scss";
import { paginateItems } from "./paginateItems";
import FavouriteManager from "../../components/FavouriteManager/FavouriteManager";
import SortSelectors from "../../components/SortSelectors/SortSelectors";

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
  const [favouritedItems, setFavouritedItems] = useState<
    { id: number; isFavourite: boolean }[]
  >([]);

  const search = useContext(SearchContext);

  // This hook is used to fetch the items from the API and only runs once
  useEffect(() => {
    getItems().then((response) => {
      setData({
        items: response.items.map((item) => ({ ...item, favourite: false })),
      });
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
    favouritedItems,
    searchTerm: search || "",
    sortBy: sortOptions.sortBy,
    orderBy: sortOptions.orderBy,
    fuseOptions: DEFAULT_SEARCH_OPTIONS,
  });

  // Update the pagination when the search results change
  useEffect(() => {
    paginateItems({
      searchResult,
      lastItem,
      setLastItem,
      setPaginatedResults,
      search,
    });
  }, [searchResult, lastItem, search, scrollPosition, favouritedItems]);

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

  const handleFavourite = (item: Item) => {
    setScrollPosition(window.pageYOffset);
    const isFavourite = !item.favourite;
    const updatedFavouritedItems = favouritedItems.filter(
      (favourite) => favourite.id !== item.id
    );
    if (isFavourite) {
      updatedFavouritedItems.push({ id: item.id, isFavourite });
    }
    setFavouritedItems(updatedFavouritedItems);
    item.favourite = isFavourite;
  };

  return (
    <>
      <div data-testid="item-sorter" className={styles.manager__sorters}>
        <SortSelectors handleSortChange={handleSortChange} />
      </div>
      <button
        className={styles.manager__modalbutton}
        data-testid="open-modal-button"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        ♥ Favoritos
      </button>
      <ModalComponent isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <FavouriteManager
          searchResult={searchResult}
          favouritedItems={favouritedItems}
          handleFavourite={handleFavourite}
        />
      </ModalComponent>
      <div data-testid="item-manager-list" className={styles.manager__list}>
        {paginatedResults.length > 0 ? (
          paginatedResults.map(({ item }) => (
            <ItemComponent
              key={item.id}
              item={item}
              handleFavourite={() => handleFavourite(item)}
            />
          ))
        ) : (
          <ItemNotFoundComponent />
        )}
        {lastItem >= paginatedResults.length &&
        lastItem <= paginatedResults.length ? (
          <>
            <button
              className={styles.manager__list__load_more}
              data-testid="button-load-more"
              onClick={handleLoadMore}
            >
              Cargar mas
            </button>
          </>
        ) : (
          <p className={styles.manager__list__no_results}>
            No hay mas resultados
          </p>
        )}
      </div>
    </>
  );
};

export default ManagerPage;
