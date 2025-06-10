import { http } from "services";
import { IProducts } from "./types";

export const search = (filters: string) =>
  http.get<IProducts.IProductResponse>(`auto/search?${filters}`);
const getProduct = (id: string) => http.get(`products/${id}`);
export const addToCart = (id: string) =>
  http.post<{ success: boolean; data: IProducts.ICartResponse }>(
    `cart/add`,
    {
      productId: id,
      quantity: 1,
    },
    {
      withCredentials: true,
    }
  );

export {};
