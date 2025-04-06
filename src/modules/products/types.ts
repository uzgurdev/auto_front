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
    pagination: IPagination;
  }
}
