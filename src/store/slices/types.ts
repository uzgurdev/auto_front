import { HomeApi, ProductsApi } from "modules";

export namespace UI {
  export interface Appearance {
    languages: "uz" | "ru" | "en";
    productsCountInCart: number;
    cart: (ProductsApi.Types.IProducts.IProduct & {
      count: number;
      originalPrice: number;
    })[];
    searchData: {
      results: ProductsApi.Types.IProducts.IProduct[];
      pagination: ProductsApi.Types.IProducts.IPagination;
      filters: string;
    };
    recs: HomeApi.Types.IHome.Recs.IResponse["data"];
  }
}
