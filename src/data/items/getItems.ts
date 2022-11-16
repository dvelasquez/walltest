import { API_URL } from "./constants";
import { ItemsResponse } from "./types";

export const hashCode = (str: string) => {
  return str
    .split("")
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    );
};

export const getItems = (): Promise<ItemsResponse> => {
  return fetch(`${API_URL}/items.json`).then(async (res) => {
    if (res.ok) {
      const jsonResponse = (await res.json()) as ItemsResponse;
      return {
        items: jsonResponse.items.map((item) => {
          item.id = hashCode(item.title);
          return item;
        }),
      };
    }
    throw new Error("Error fetching items");
  });
};
