import { http } from "services";
import { ICart } from "./types";

// Define the actual API response structure based on the real response
interface CartApiResponse {
  success: boolean;
  data: {
    _id: string;
    sessionId: string;
    items: Array<{
      productId: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
      _id: string;
    }>;
    total: number;
    tenantId: string;
    currency: string;
    expiresAt: string;
    lastModified: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const Cart = () => http.get<CartApiResponse>("/cart");
export const cart = () => http.get<CartApiResponse>("/cart");
export const AddToCart = (item: ICart.ICartItem) =>
  http.post<ICart.IAddToCartResponse>("/cart/add", item);
export const RemoveFromCart = (itemId: string) =>
  http.delete<ICart.IRemoveFromCartResponse>(`/cart/remove/${itemId}`);
export const UpdateCartItem = (item: { quantity: number; productId: string }) =>
  http.put<ICart.IUpdateCartItemResponse>("/cart/", item);
export const submitOrder = (data: any) =>
  http.post<{ success: boolean; message?: string }>("/orders/create", data);
