export namespace ICart {
  export interface CartProduct {
    _id: string;
    name: string;
    price: number;
    count: number;
    originalPrice?: number;
  }

  export interface Cart {
    cart: CartProduct[];
    productsCountInCart: number;
  }
}
