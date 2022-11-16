import React from "react";
import { render } from "@testing-library/react";
import ItemNotFoundComponent from "./ItemNotFoundComponent";
describe("ItemNotFoundComponent test suite", () => {
  it("should render the ItemNotFoundComponent", () => {
    const { getByTestId } = render(<ItemNotFoundComponent />);
    const itemNotFoundComponent = getByTestId("item-component__no-results");
    expect(itemNotFoundComponent).toBeInTheDocument();
  });
});
