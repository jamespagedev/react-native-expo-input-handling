import { shops } from "@app/data";
import { sleep } from "@app/utils";
import { OrderShop } from "@app/types";

export async function fakeApiGetShops(): Promise<Array<OrderShop>> {
  try {
    await sleep(2000);
    const result = shops;
    return result as never;
  } catch (error: any) {
    throw new Error(error);
  }
}
