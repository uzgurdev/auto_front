export namespace IProducts {
  export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    type: string;
    carModel: string;
    images: string[];
    status: boolean;
    producer: string;
    tenantId: string; // Uzbekistan or Kazakhstan
    currency: string; // USD or KZT
    inStock: number; // Stock quantity
    lowStockAlert: number; // Low stock alert
  }

  export interface IPagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }

  export interface IProductResponse {
    results: IProduct[];
    cartCount?: number;
    pagination: IPagination;
  }

  export interface IItems {
    productId: string;
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    inStock: number;
  }

  export interface ICartResponse {
    _id: string;
    sessionId: string;
    items: IItems[];
    total: number;
    tenantId: string;
    currency: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
    lastModified: string;
    __v: number;
  }
}
