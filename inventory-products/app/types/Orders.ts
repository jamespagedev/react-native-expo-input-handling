import { ShopTypes } from "./Api";

export interface Order {
  status: "incomplete" | "ready" | "submitted";
  shop: OrderShopDropdownSelection | null;
  products: Array<OrderProduct>;
}

export interface OrderShopDropdownSelection {
  id: number;
  name: string;
  type: ShopTypes;
  value: number;
  label: string;
}

export type OrderShopIdsToDropdownSelection = {
  [key: string]: OrderShopDropdownSelection;
};

export type OrderProductNameValidationStatus =
  | "empty"
  | "validating"
  | "failed"
  | "success";

export interface OrderProduct {
  validationNameStatus: OrderProductNameValidationStatus;
  name: string;
  qty: string;
  notes: string;
}
