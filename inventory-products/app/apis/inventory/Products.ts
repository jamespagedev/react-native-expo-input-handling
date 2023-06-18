import { axiosPostRequest } from "./AxiosWrapper";
import { products } from "@app/data";
import { productsApiEndpoints, sleep } from "@app/utils";
import { FakeProducts } from "@app/types";

export async function apiValidateProduct(
  shopId: number,
  product: string
): Promise<boolean> {
  try {
    const result = await axiosPostRequest([
      productsApiEndpoints.products,
      { shopId, product },
    ]);
    return result.data.Response;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function fakeApiValidateProduct<K extends keyof FakeProducts>(
  shopId: K,
  productName: string
): Promise<boolean> {
  try {
    await sleep(2000);
    const result = products[shopId].includes(productName);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}
