import { renderHook } from "@testing-library/react";
import useSearch, { DEFAULT_SEARCH_OPTIONS } from "./useSearch";
import { itemsFixture } from "../data/items/items.fixture";
import { ItemField } from "../data/items/types";
import sortAssertions from "../../cypress/fixtures/sort-assertions.json";
import searchAssertions from "../../cypress/fixtures/search-assertions.json";

describe("useSearch test suite", () => {
  it("should filter the list based on the parameters", () => {
    const assertions = searchAssertions;
    expect.assertions(assertions.length);

    assertions.forEach(({ searchTerm, results }) => {
      const { result } = renderHook(() =>
        useSearch({
          list: itemsFixture.items,
          favouritedItems: [],
          searchTerm: searchTerm,
          sortBy: "title",
          orderBy: "asc",
          fuseOptions: DEFAULT_SEARCH_OPTIONS,
        })
      );
      expect(result.current).toHaveLength(results);
    });
  });

  it("should return the full list if no searchTerm is provided", () => {
    const { result } = renderHook(() =>
      useSearch({
        list: itemsFixture.items,
        favouritedItems: [],
        searchTerm: "",
        sortBy: "title",
        orderBy: "asc",
        fuseOptions: DEFAULT_SEARCH_OPTIONS,
      })
    );
    expect(result.current).toHaveLength(itemsFixture.items.length);
  });

  it("should sort the list based on the parameters", () => {
    const assertions = sortAssertions as {
      sortBy: ItemField;
      orderBy: "asc" | "desc";
      firstResult: string;
      secondResult: string;
    }[];

    assertions.forEach((assertion) => {
      const { result } = renderHook(() =>
        useSearch({
          list: itemsFixture.items,
          favouritedItems: [],
          searchTerm: "",
          sortBy: assertion.sortBy,
          orderBy: assertion.orderBy,
          fuseOptions: DEFAULT_SEARCH_OPTIONS,
        })
      );
      expect(result.current).toHaveLength(itemsFixture.items.length);
      expect(result.current[0].item.title).toBe(assertion.firstResult);
      expect(result.current[1].item.title).toBe(assertion.secondResult);
    });
  });
});
