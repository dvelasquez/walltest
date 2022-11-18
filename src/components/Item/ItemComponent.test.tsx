import { Item } from "../../data/items/types";
import React from "react";
import { render } from "@testing-library/react";
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
});
