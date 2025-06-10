import { http } from "services";

export const cart = () => http.get("cart");
export const submitOrder = (data: any) =>
  http.post("orders/create", { ...data });
