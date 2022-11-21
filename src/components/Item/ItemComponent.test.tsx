import { Item } from "../../data/items/types";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemComponent from "./ItemComponent";

describe("ItemComponent test suite", () => {
  it("should render the item component", () => {
    const item: Item = {
      id: 123,
      title: "Test title",
      description: "Test description",
      email: "test@wallapop.com",
      image: "https://wallapop.com/image.jpg",
      price: "100",
    };
    const { getByText } = render(
      <ItemComponent item={item} handleFavourite={jest.fn()} />
    );
    expect(getByText(item.title)).toBeInTheDocument();
  });

  it("should render the item component with the favourite button", async () => {
    const item: Item = {
      id: 123,
      title: "Test title",
      description: "Test description",
      email: "test@wallapop.com",
      image: "https://wallapop.com/image.jpg",
      price: "100",
      favourite: false,
    };

    const handleFavourite = jest.fn().mockImplementation((item) => {
      return { ...item, favourite: !item.favourite };
    });
    const { getByTestId } = render(
      <ItemComponent item={item} handleFavourite={handleFavourite} />
    );
    const favouriteButton = getByTestId("item-favourite-button");
    expect(favouriteButton).toHaveAttribute("data-state", "favourite-inactive");
    await userEvent.click(getByTestId("item-favourite-button"));
    await expect(handleFavourite).toBeCalled();
    waitFor(() => {
      expect(favouriteButton).toHaveAttribute("data-state", "favourite-active");
    });
  });
});
