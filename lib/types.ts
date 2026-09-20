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
  stripeSessionId: string | null;
  customerEmail: string;
  country: string | null;
  items: string;
  createdAt: string;
}
