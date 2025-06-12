export namespace IProducts {
  export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: string; // Changed from number to string to match database format
    type: string;
    producer: string; // Producer brand (e.g., "GAMMA")
    carBrand: string; // Car manufacturer (e.g., "Chevrolet")
    carModel: string[]; // Car models (e.g., ["Nexia", "Ravon 3"])
    carPartIds: string[]; // IDs of car parts
    position: string;
    images: string[];
    status: boolean;
    tenantId: string;
    currency: string;
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
    // inStock: number; // Commented out to disable stock functionality
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
