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
        ProductsApi.Types.IProducts.IProduct & {
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
    setSearchData: (
      state,
      action: PayloadAction<UI.Appearance["searchData"]>
    ) => {
      state.searchData = action.payload;
    },
    setRecs: (state, action: PayloadAction<UI.Appearance["recs"]>) => {
      state.recs = action.payload;
    },
  },
});

export const {
  setLanguage,
  addToCart,
  setProductsCountInCart,
  setSearchData,
  setRecs,
} = UISlice.actions;
export default UISlice.reducer;
