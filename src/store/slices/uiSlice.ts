import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UI } from "./types";
import { HomeApi, ProductsApi } from "modules";

const initialState: UI.Appearance = {
  languages: "ru",
  productsCountInCart: 0,
  cart: [],
  searchData: {
    results: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
      itemsPerPage: 20,
      hasNextPage: false,
      hasPrevPage: false,
    },
    filters: "",
  },
  recs: {} as HomeApi.Types.IHome.Recs.IResponse["data"],
  searchProducts: {
    results: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 20,
      hasNextPage: false,
      hasPrevPage: false,
    },
  } as ProductsApi.Types.IProducts.IProductResponse,
  priceRange: {
    min: 1,
    max: 1000,
    current: [1, 1000],
  },
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<UI.Appearance["languages"]>) => {
      state.languages = action.payload;
    },
    addToCart: (
      state,
      action: PayloadAction<
        ProductsApi.Types.IProducts.IItems & {
          count: number;
          originalPrice?: number;
        }
      >
    ) => {
      const productIdx = state.cart.findIndex(
        (p) => p._id === action.payload._id
      );
      if (productIdx === -1) {
        state.cart.push({
          ...action.payload,
          originalPrice: action.payload.price,
        });
        state.productsCountInCart = state.cart.length;
      } else {
        state.cart[productIdx].count++;
      }
    },
    setProductsCountInCart: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const productIdx = state.cart.findIndex(
        (p) => p._id === action.payload.id
      );

      if (productIdx === -1) return;

      if (action.payload.count !== 0) {
        const originalPrice =
          state.cart[productIdx].originalPrice ?? state.cart[productIdx].price;
        state.cart[productIdx].count = action.payload.count;
        state.cart[productIdx].price = originalPrice * action.payload.count;
      } else {
        state.cart = state.cart.filter((p) => p._id !== action.payload.id);
        state.productsCountInCart = state.cart.length;
      }
    },
    setCartCount: (state, action: PayloadAction<number>) => {
      state.productsCountInCart = action.payload;
    },
    setCart: (
      state,
      action: PayloadAction<ProductsApi.Types.IProducts.IItems[] | any[]>
    ) => {
      if (action.payload.length === 0) {
        state.cart = [] as (ProductsApi.Types.IProducts.IItems & {
          count?: number;
          originalPrice: number;
        })[];
        state.productsCountInCart = 0;
        return;
      }
      const cart = action.payload.map((item) => ({
        ...item,
        count: item.count || item.quantity || 1, // Handle both count and quantity
        originalPrice: item.originalPrice || item.price,
      }));
      state.cart = cart;
      state.productsCountInCart = cart.length;
    },
    setSearchData: (
      state,
      action: PayloadAction<UI.Appearance["searchData"]>
    ) => {
      state.searchData = action.payload;
    },
    setRecs: (state, action: PayloadAction<UI.Appearance["recs"]>) => {
      state.recs = action.payload;
    },
    setSearchProducts: (
      state,
      action: PayloadAction<UI.Appearance["searchProducts"]>
    ) => {
      state.searchProducts = action.payload;
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.priceRange.min = action.payload.min;
      state.priceRange.max = action.payload.max;
      // Reset current range to new bounds
      state.priceRange.current = [action.payload.min, action.payload.max];
    },
    setPriceRangeCurrent: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange.current = action.payload;
    },
    resetPriceRange: (state) => {
      state.priceRange = {
        min: 1,
        max: 1000,
        current: [1, 1000],
      };
    },
  },
});

export const {
  setLanguage,
  addToCart,
  setCartCount,
  setProductsCountInCart,
  setCart,
  setSearchData,
  setRecs,
  setSearchProducts,
  setPriceRange,
  setPriceRangeCurrent,
  resetPriceRange,
} = UISlice.actions;
export default UISlice.reducer;
