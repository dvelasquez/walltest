import React from "react";
import { Item } from "../../data/items/types";

export const paginateItems = ({
  searchResult,
  lastItem,
  setLastItem,
  setPaginatedResults,
  search,
}: {
  searchResult: { item: Item }[];
  lastItem: number;
  setLastItem: React.Dispatch<React.SetStateAction<number>>;
  setPaginatedResults: React.Dispatch<React.SetStateAction<{ item: Item }[]>>;
  search: string;
}) => {
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
};
