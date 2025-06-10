import { http } from "services";
import { ICart } from "./types";

export const Cart = () => http.get<ICart.ICart>("/cart");
export const AddToCart = (item: ICart.ICartItem) =>
  http.post<ICart.IAddToCartResponse>("/cart/add", item);
export const RemoveFromCart = (itemId: string) =>
  http.post<ICart.IRemoveFromCartResponse>("/cart/remove", { itemId });
export const UpdateCartItem = (item: ICart.ICartItem) =>
  http.post<ICart.IUpdateCartItemResponse>("/cart/", item);
