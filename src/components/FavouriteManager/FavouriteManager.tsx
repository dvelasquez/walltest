import React, { useState } from "react";
import styles from "./FavouriteManager.module.scss";
import SearchBar from "../SearchBar/SearchBar";
import FavouriteItem from "../FavouriteItem/FavouriteItem";
import { Item } from "../../data/items/types";
import useSearch, { DEFAULT_SEARCH_OPTIONS } from "../../hooks/useSearch";

const FavouriteManager = ({
  searchResult,
  handleFavourite,
  favouritedItems,
}: {
  searchResult: { item: Item }[];
  favouritedItems: { id: number; isFavourite: boolean }[];
  handleFavourite: (item: Item) => void;
}) => {
  const [search, setSearch] = useState<string>("");
  const list: Item[] = searchResult.map((item) => item.item);

  const filteredResults = useSearch({
    list,
    searchTerm: search,
    favouritedItems,
    sortBy: "title",
    orderBy: "asc",
    fuseOptions: {
      ...DEFAULT_SEARCH_OPTIONS,
      keys: ["title"],
    },
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <h2>Listado Favoritos</h2>
      <div>
        <SearchBar
          search={search}
          handleSearchChange={handleSearchChange}
          testId="modal"
        />
      </div>
      <div className={styles.favouritelist}>
        {filteredResults.map(
          ({ item }) =>
            item.favourite && (
              <FavouriteItem
                key={item.id}
                item={item}
                handleFavourite={handleFavourite}
              />
            )
        )}
      </div>
    </>
  );
};

export default FavouriteManager;
