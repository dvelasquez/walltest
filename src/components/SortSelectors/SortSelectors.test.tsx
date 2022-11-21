import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortSelectors from "./SortSelectors";

describe("SortSelectors test suite", () => {
  it("should render the sort selectors", () => {
    const { getByTestId } = render(
      <SortSelectors handleSortChange={jest.fn()} />
    );
    expect(getByTestId("select-sort-field")).toBeInTheDocument();
    expect(getByTestId("select-sort-order")).toBeInTheDocument();
  });

  it("should call the handleSortChange function", async () => {
    const mockHandleSortChange = jest.fn();
    const { getByTestId } = render(
      <SortSelectors handleSortChange={mockHandleSortChange} />
    );
    const sortSelectField = getByTestId(
      "select-sort-field"
    ) as HTMLSelectElement;
    userEvent.selectOptions(getByTestId("select-sort-field"), "title");
    await waitFor(() => {
      expect(mockHandleSortChange).toHaveBeenCalledTimes(1);
      expect(sortSelectField.value).toBe("title");
    });
    userEvent.selectOptions(getByTestId("select-sort-order"), "desc");
    const selectSortOrder = getByTestId(
      "select-sort-order"
    ) as HTMLSelectElement;
    await waitFor(() => {
      expect(mockHandleSortChange).toHaveBeenCalledTimes(2);
      expect(selectSortOrder.value).toBe("desc");
    });
  });
});
