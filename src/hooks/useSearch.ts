import { useMemo } from "react";
import Fuse from "fuse.js";
import { Item, ItemField, ItemFields } from "../data/items/types";

/**
 * Check if provided object is of type Item
 * @param item element to check if is of a Item type
 * @returns true if item is of type Item
 */
export function isItem(item: unknown): item is Item {
  return (
    item instanceof Object &&
    item.hasOwnProperty("id") &&
    item.hasOwnProperty("title") &&
    item.hasOwnProperty("description") &&
    item.hasOwnProperty("price") &&
    item.hasOwnProperty("email") &&
    item.hasOwnProperty("image")
  );
}

/**
 * Sorts an array of Fuse.js search results by a given Item field.
 * @param list Array of items to sort
 * @param sortOptions Options for sorting
 * @returns the sorted array
 */
export function sortItems<T>(
  list: { item: T }[],
  sortOptions: { sortBy: ItemField; orderBy: "asc" | "desc" }
) {
  const { sortBy, orderBy } = sortOptions;
  return list.sort((a: { item: T }, b: { item: T }) => {
    if (
      isItem(a.item) &&
      isItem(b.item) &&
      (a.item[sortBy] as keyof typeof ItemFields)
    ) {
      if (sortBy === "price") {
        return orderBy === "asc"
          ? Number(a.item[sortBy]) - Number(b.item[sortBy])
          : Number(b.item[sortBy]) - Number(a.item[sortBy]);
      }
      if (a.item[sortBy] < b.item[sortBy]) {
        return orderBy === "asc" ? -1 : 1;
      }
      if (a.item[sortBy] > b.item[sortBy]) {
        return orderBy === "asc" ? 1 : -1;
      }
    }
    return 0;
  });
}

export function isFavourite(
  item: Item,
  favouritedItems: { id: number; isFavourite: boolean }[]
) {
  const favourite = favouritedItems.find(
    (favourite) => favourite.id === item.id
  );
  return favourite ? favourite.isFavourite : false;
}

/**
 * A React Hook that filters an array using the Fuse.js fuzzy-search library.
 *
 * @param list The array to filter.
 * @param searchTerm The search term to filter by.
 * @param sortBy The field to sort by.
 * @param orderBy The order to sort by.
 * @param fuseOptions Options for Fuse.js.
 *
 * @returns The filtered array.
 *
 * @see https://fusejs.io/
 */
function useSearch<T>({
  list,
  favouritedItems,
  searchTerm,
  sortBy,
  orderBy,
  fuseOptions,
}: {
  list: T[];
  favouritedItems: { id: number; isFavourite: boolean }[];
  searchTerm: string;
  sortBy: ItemField;
  orderBy: "asc" | "desc";
  fuseOptions?: Fuse.IFuseOptions<T>;
}) {
  const fuse = useMemo(() => {
    return new Fuse(list, fuseOptions);
  }, [list, fuseOptions]);

  const results = useMemo(() => {
    if (!searchTerm) {
      return sortItems(
        list.map((item: T) => {
          return {
            item: {
              ...item,
              favourite: isFavourite(item as Item, favouritedItems),
            },
          };
        }),
        { sortBy, orderBy }
      );
    }
    return sortItems(fuse.search(searchTerm), { sortBy, orderBy });
  }, [fuse, searchTerm, list, sortBy, orderBy, favouritedItems]);

  return results;
}

export const DEFAULT_SEARCH_OPTIONS = {
  findAllMatches: true,
  threshold: 0.1,
  ignoreLocation: true,
  keys: ["title", "description", "email", "price"],
};

export default useSearch;
