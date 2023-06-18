import { create } from "zustand";
import { Order, OrderProduct, OrderShopDropdownSelection } from "@app/types";
import { copyByValue } from "@app/utils";

interface OrderStore {
  order: Order;
  resetOrder: () => void;
  setShop: (s: OrderShopDropdownSelection) => void;
  setProducts: (p: Array<OrderProduct>) => void;
}

const initialOrder: Order = {
  status: "incomplete",
  shop: null,
  products: [],
};

export const useOrdersStore = create<OrderStore>((set, get) => ({
  order: copyByValue(initialOrder),
  resetOrder: () => set(() => ({ order: copyByValue(initialOrder) })),
  setShop: (s: OrderShopDropdownSelection) => {
    const newOrder: Order = copyByValue(initialOrder);
    newOrder.shop = s;
    set(() => ({ order: newOrder }));
  },
  setProducts: (p: Array<OrderProduct>) => {
    const updatedOrder: Order = get().order;
    updatedOrder.products = p;
    set(() => ({ order: updatedOrder }));
  },
}));
