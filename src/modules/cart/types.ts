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
    data: {
      _id: string;
      sessionId: string;
      items: ICartItem[];
      total: number;
      currency: string;
      expiresAt: string;
      lastModified: string;
      createdAt: string;
      updatedAt: string;
    };
  }

  export interface IUpdateCartItemResponse {
    success: boolean;
    data: {
      _id: string;
      sessionId: string;
      items: ICartItem[];
      total: number;
      currency: string;
    };
  }

  export interface IGetCartResponse {
    cart: ICart;
  }
}
