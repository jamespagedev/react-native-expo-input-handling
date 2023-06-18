import { axiosPostRequest } from "./AxiosWrapper";
import { products } from "@app/data";
import { hitormissApiEndpoints, sleep } from "@app/utils";

export async function apiValidateProduct(product: string): Promise<boolean> {
  try {
    const result = await axiosPostRequest([
      hitormissApiEndpoints.products,
      { product },
    ]);
    return result.data.Response;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function fakeApiValidateProduct(
  product: string
): Promise<boolean> {
  try {
    await sleep(2000);
    const result = products.hitOrMiss.includes(product);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}
