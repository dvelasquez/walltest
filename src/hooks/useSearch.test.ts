import { renderHook } from "@testing-library/react";
import useSearch, { DEFAULT_SEARCH_OPTIONS } from "./useSearch";
import { itemsFixture } from "../data/items/items.fixture";

describe("useSearch test suite", () => {
  it("should filter the list based on the parameters", () => {
    const assertions = [
      {
        searchTerm: "iphone",
        results: 1,
      },
      {
        searchTerm: "mac",
        results: 1,
      },
      {
        searchTerm: "para colecionistas",
        results: 2,
      },
      {
        searchTerm: "color",
        results: 4,
      },
      {
        searchTerm: "250",
        results: 2,
      },
      {
        searchTerm: "tv@wallapop.com ",
        results: 1,
      },
      {
        searchTerm: "asdasfaasd",
        results: 0,
      },
    ];
    expect.assertions(assertions.length);

    assertions.forEach(({ searchTerm, results }) => {
      const { result } = renderHook(() =>
        useSearch(itemsFixture.items, searchTerm, DEFAULT_SEARCH_OPTIONS)
      );
      expect(result.current).toHaveLength(results);
    });
  });

  it("should return the full list if no searchTerm is provided", () => {
    const { result } = renderHook(() =>
      useSearch(itemsFixture.items, "", DEFAULT_SEARCH_OPTIONS)
    );
    expect(result.current).toHaveLength(itemsFixture.items.length);
  });
});
