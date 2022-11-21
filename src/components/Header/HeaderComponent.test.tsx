import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeaderComponent from "./HeaderComponent";
describe("HeaderComponent test suite", () => {
  const mockHandleSearchChange = jest.fn();
  it("should render the HeaderComponent", () => {
    const { getByTestId } = render(
      <HeaderComponent handleSearchChange={mockHandleSearchChange} search="" />
    );
    const headerComponent = getByTestId("header-component");
    expect(headerComponent).toBeInTheDocument();
  });
  it("should render the HeaderComponent logo", () => {
    const { getByTestId } = render(
      <HeaderComponent handleSearchChange={mockHandleSearchChange} search="" />
    );
    const headerLogo = getByTestId("header-logo");
    expect(headerLogo).toBeInTheDocument();
  });
  it("should render the HeaderComponent searchbar", () => {
    const { getByTestId } = render(
      <HeaderComponent handleSearchChange={mockHandleSearchChange} search="" />
    );
    const headerSearchbar = getByTestId("searchbar");
    expect(headerSearchbar).toBeInTheDocument();
  });
  it("should call the handleSearchChange mock if something is typed in the input", async () => {
    const { getByTestId } = render(
      <HeaderComponent handleSearchChange={mockHandleSearchChange} search="" />
    );
    const searchString = "test search";
    const headerSearchbar = getByTestId("searchbar");
    await userEvent.type(headerSearchbar, searchString);
    expect(mockHandleSearchChange).toHaveBeenCalledTimes(searchString.length);
  });
});
