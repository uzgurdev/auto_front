import { HomeApi, ProductsApi } from "modules";

export namespace UI {
  export interface Appearance {
    languages: "uz" | "ru" | "en";
    productsCountInCart: number;
    cart: (ProductsApi.Types.IProducts.IItems & {
      count?: number;
      originalPrice: number;
    })[];
    searchData: {
      results: ProductsApi.Types.IProducts.IProduct[];
      pagination: ProductsApi.Types.IProducts.IPagination;
      filters: string;
    };
    recs: HomeApi.Types.IHome.Recs.IResponse["data"];
    searchProducts: ProductsApi.Types.IProducts.IProductResponse;
  }
}
