export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string | null;
  position: number;
  isVisible: boolean;
  stock: number;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  mollieId: string | null;
  customerEmail: string;
  items: string;
  createdAt: string;
}
