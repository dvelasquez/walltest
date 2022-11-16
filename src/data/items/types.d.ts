export interface Item {
  id: number;
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
}

export interface ItemsResponse {
  items: Item[];
}
