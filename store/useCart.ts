import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PurchaseType = "buy" | "preorder" | "subscription";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  purchaseType: PurchaseType;
  subscriptionDuration?: 3 | 5;
  monthlyPrice?: number;
  kautionAmount: number;
  deliveryDate?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  kautionTotal: () => number;
  subscriptionMonthlyTotal: () => number;
  itemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.id === item.id && i.purchaseType === item.purchaseType && i.subscriptionDuration === item.subscriptionDuration
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id && i.purchaseType === item.purchaseType && i.subscriptionDuration === item.subscriptionDuration
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
        set({ isOpen: true });
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () =>
        get().items.reduce((sum, item) => {
          if (item.purchaseType === "subscription") {
            return sum + item.kautionAmount * item.quantity;
          }
          return sum + item.price * item.quantity;
        }, 0),
      kautionTotal: () =>
        get().items.reduce((sum, item) => sum + item.kautionAmount * item.quantity, 0),
      subscriptionMonthlyTotal: () =>
        get().items.reduce((sum, item) => sum + (item.monthlyPrice || 0) * item.quantity, 0),
      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "aquacubes-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
