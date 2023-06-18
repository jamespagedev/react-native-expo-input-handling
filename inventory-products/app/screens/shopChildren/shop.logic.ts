import {
  OrderShop,
  OrderShopDropdownSelection,
  OrderShopIdsToDropdownSelection,
} from "@app/types";

export function getShopSelections(
  responseShops: Array<OrderShop>
): Array<OrderShopDropdownSelection> {
  const shops: Array<OrderShopDropdownSelection> = responseShops.map(
    (shop: OrderShop) => {
      return {
        id: shop.id,
        name: shop.name,
        type: shop.type,
        value: shop.id,
        label: shop.name,
      };
    }
  );
  return shops;
}

export function getShopIdsToSelection(
  shopSelections: Array<OrderShopDropdownSelection>
): OrderShopIdsToDropdownSelection {
  const shopIdsToSelection: OrderShopIdsToDropdownSelection = {};
  shopSelections.forEach((s: OrderShopDropdownSelection) => {
    shopIdsToSelection[s.value] = s;
  });
  return shopIdsToSelection;
}
