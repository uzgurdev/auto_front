export namespace ICart {
  export interface ICartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }

  export interface ICart {
    items: ICartItem[];
    totalPrice: number;
  }

  export interface IAddToCartResponse {
    success: boolean;
    message?: string;
  }

  export interface IRemoveFromCartResponse {
    success: boolean;
    message?: string;
  }

  export interface IUpdateCartItemResponse {
    success: boolean;
    item?: ICartItem;
  }

  export interface IGetCartResponse {
    cart: ICart;
  }
}
