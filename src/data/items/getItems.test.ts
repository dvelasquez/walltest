import { getItems } from "./getItems";

global.fetch = jest.fn();

describe("getItems test suite", () => {
  it("should return the items upon call", () => {
    jest.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    } as Response);
    expect(getItems()).resolves.toEqual({ items: [] });
  });
});
