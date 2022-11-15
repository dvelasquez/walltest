import { API_URL } from "./constants";
import { ItemsResponse } from "./types";

export const getItems = (): Promise<ItemsResponse> => {
  return fetch(`${API_URL}/items.json`).then((res) => res.json());
};
