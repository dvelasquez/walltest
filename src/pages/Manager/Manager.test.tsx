import React from "react";
import {
  render,
  waitFor,
  screen,
  getAllByTestId,
} from "@testing-library/react";
import ManagerPage from "./Manager";
import useSearch from "../../hooks/useSearch";
import { getItems } from "../../data/items";
import { itemsFixture } from "../../data/items/items.fixture";

jest.mock("../../hooks/useSearch");
jest.mock("../../data/items/getItems");

describe("Manager test suite", () => {
  it("should render an empty list if no results", async () => {
    jest.mocked(useSearch).mockReturnValue([]);
    jest.mocked(getItems).mockResolvedValue(itemsFixture);

    render(<ManagerPage />);
    await waitFor(() => screen.getByTestId("item-manager-list"));
    const manager = screen.getByTestId("item-manager-list");
    expect(manager).toBeInTheDocument();
  });
  it("should render the list if search return values", async () => {
    jest
      .mocked(useSearch)
      .mockReturnValue(itemsFixture.items.map((item) => ({ item })));
    jest.mocked(getItems).mockResolvedValue(itemsFixture);

    render(<ManagerPage />);
    await waitFor(() => screen.getByTestId("item-manager-list"));
    const manager = screen.getByTestId("item-manager-list");
    expect(manager).toBeInTheDocument();
  });

  it("should render only the first 5 items", async () => {
    jest
      .mocked(useSearch)
      .mockReturnValue(itemsFixture.items.map((item) => ({ item })));
    jest.mocked(getItems).mockResolvedValue(itemsFixture);

    render(<ManagerPage />);
    await waitFor(() => screen.getAllByTestId("item-component"));

    const items = screen.getAllByTestId("item-component");
    expect(items.length).toBe(5);
  });
});
