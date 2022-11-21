import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavouriteItem from "./FavouriteItem";
import { itemsFixture } from "../../data/items/items.fixture";

const mockHandleFavourite = jest.fn();
describe("FavouriteItem test suite", () => {
  it("should render the FavouriteItem", () => {
    const { getByTestId } = render(
      <FavouriteItem
        item={itemsFixture.items[0]}
        handleFavourite={mockHandleFavourite}
      />
    );
    const favouriteItem = getByTestId("favourite-item");
    expect(favouriteItem).toBeInTheDocument();
  });

  it("should call the mockHandleFavourite on click", async () => {
    const { getByTestId } = render(
      <FavouriteItem
        item={{ ...itemsFixture.items[0], favourite: true }}
        handleFavourite={mockHandleFavourite}
      />
    );
    const favouriteItem = getByTestId("favourite-item-remove");
    await userEvent.click(favouriteItem);
    expect(mockHandleFavourite).toBeCalled();
  });
});
