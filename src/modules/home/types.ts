import { Types } from "modules/products";

export namespace IHome {
  export interface HomeRes {
    success: boolean;
    data: {
      cart: {
        count: number;
        // May be added other thing.
      };
      tags: Array<{
        _id: string;
        name: string;
      }>;
      banner: any; // I'm considering adding this.
      filters: Array<{
        _id: string;
        name: string;
        type: "producer" | "carBrand" | "carType";
        count: number;
      }>;
      discount: {
        _id: string;
        percentage: number;
        expDate: Date;
      };
    };
  }

  export namespace Recs {
    export interface IMostOrdered {
      _id: string;
      name: string;
      count: number;
    }

    export interface IProducts {
      productId: string;
      name: string;
      count: number;
      producer: string;
      images: string[];
      price: number;
      category: string;
    }

    export interface mostOrderedByCategory {
      products: IProducts[];
      category: string;
    }

    export interface IResponse {
      success: boolean;
      data: {
        mostOrdered: IMostOrdered[];
        mostOrderedByCategory: mostOrderedByCategory[];
      };
    }
  }
}
