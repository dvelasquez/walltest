import { getItems } from "./getItems";

global.fetch = jest.fn();
const mockFetch = jest.mocked(global.fetch);

describe("getItems test suite", () => {
  it("should return the items upon call", () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ items: [] }),
    } as Response);
    expect(getItems()).resolves.toEqual({ items: [] });
  });
});
