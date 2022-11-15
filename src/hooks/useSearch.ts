import * as React from "react";
import Fuse from "fuse.js";

/**
 * A React Hook that filters an array using the Fuse.js fuzzy-search library.
 *
 * @param list The array to filter.
 * @param searchTerm The search term to filter by.
 * @param fuseOptions Options for Fuse.js.
 *
 * @returns The filtered array.
 *
 * @see https://fusejs.io/
 */
function useSearch<T>(
  list: T[],
  searchTerm: string,
  fuseOptions?: Fuse.IFuseOptions<T>
) {
  const fuse = React.useMemo(() => {
    return new Fuse(list, fuseOptions);
  }, [list, fuseOptions]);

  const results = React.useMemo(() => {
    if (!searchTerm) {
      return list.map((item) => ({ item: item }));
    }
    return fuse.search(searchTerm);
  }, [fuse, searchTerm, list]);

  return results;
}

export default useSearch;
