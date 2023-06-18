export type ShopTypes = "local" | "online" | "hybrid";

export interface OrderShop {
  id: number;
  name: string;
  type: ShopTypes;
}

export interface FakeProducts {
  "1": Array<string>;
  "2": Array<string>;
  "3": Array<string>;
}
