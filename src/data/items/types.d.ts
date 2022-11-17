export interface Item {
  id: number;
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
}

const ItemFields = ["title", "description", "email", "price"] as const;

export type ItemField = typeof ItemFields[number];

export interface ItemsResponse {
  items: Item[];
}
