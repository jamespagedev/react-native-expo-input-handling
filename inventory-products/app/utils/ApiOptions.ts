import * as SecureStore from "expo-secure-store";
import { VIEWER_TOKEN } from "./storage";

type AxiosHeaders = {
  Accept: string;
  "Content-Type": string;
  AuthToken?: string;
};

export interface AxiosOptions {
  params?: any;
  data?: any;
  headers: AxiosHeaders;
}

const axiosOptions: AxiosOptions = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const getAuthToken = async (): Promise<unknown> => {
  const storedToken: string | null = await SecureStore.getItemAsync(
    VIEWER_TOKEN
  );
  const secureToken = new Promise((resolve, reject) => {
    resolve(storedToken);
    reject(new Error("your api is down."));
  });
  return secureToken;
};

export const getAxiosOptions = (isAuth: boolean): Promise<AxiosOptions> => {
  const noAuthHeaderPromise: Promise<AxiosOptions> = new Promise(
    (resolve, reject): void => {
      resolve(axiosOptions);
      reject(new Error("your api options are down."));
    }
  );
  if (isAuth) return noAuthHeaderPromise;
  return getAuthToken().then((token: any) => {
    if (token && token.length > 0) {
      axiosOptions.headers.AuthToken = token;
    }
    return axiosOptions;
  });
};

export const updateAxiosOptionsHeaders = <K extends keyof AxiosHeaders>(
  key: K,
  value: AxiosHeaders[K]
): void => {
  axiosOptions.headers[key] = value;
};
