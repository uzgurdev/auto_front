import { http } from "services";
import { IHome } from "./types";
import { ProductsApi } from "modules";

export const Home = () => http.get<IHome.HomeRes>("/home");

export const Recs = () => http.get<IHome.Recs.IResponse>("/rec");

export const FilterProducers = () =>
  http.get<{ success: boolean; data: string[] }>("/filters/producers");

export const FilterBrands = (producer: string) =>
  http.get<{ success: boolean; data: string[] }>(
    `/filters/producers/${producer}/car-brands`
    // filters/producers/GAMMA/car-brands
  );

export const FilterModels = (producer: string, brand: string) =>
  http.get<{ success: boolean; data: string[] }>(
    `/filters/producers/${producer}/car-brands/${brand}/models`
  );

export const FilterSearch = (filter: string) =>
  http.get<{
    success: boolean;
    data: ProductsApi.Types.IProducts.IProduct[];
    pagination: ProductsApi.Types.IProducts.IPagination;
  }>("/filters/search?" + filter);
