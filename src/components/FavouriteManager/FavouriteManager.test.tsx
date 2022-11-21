import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavouriteManager from "./FavouriteManager";
import { itemsFixture } from "../../data/items/items.fixture";

const mockHandleFavourite = jest.fn();
describe("FavouriteManager test suite", () => {
  it("should render the favourite manager", () => {
    const searchResult = itemsFixture.items.map((item) => ({ item }));
    const { getByText } = render(
      <FavouriteManager
        favouritedItems={[]}
        searchResult={searchResult}
        handleFavourite={jest.fn()}
      />
    );
    expect(getByText("Listado Favoritos")).toBeInTheDocument();
  });

  it("should render the favourite manager with the favourite items", async () => {
    const searchResult = itemsFixture.items.map((item, index) => ({
      item: { ...item, favourite: index < 4 },
    }));
    const favouriteList = itemsFixture.items.map((item, index) => ({
      id: item.id,
      isFavourite: index < 4,
    }));
    const { getByText, getAllByTestId } = render(
      <FavouriteManager
        favouritedItems={favouriteList}
        searchResult={searchResult}
        handleFavourite={mockHandleFavourite}
      />
    );
    expect(getByText("Listado Favoritos")).toBeInTheDocument();
    expect(getAllByTestId("favourite-item")).toHaveLength(4);
    await userEvent.click(getAllByTestId("favourite-item-remove")[0]);
    await waitFor(() => {
      expect(mockHandleFavourite).toBeCalled();
    });
  });
});
