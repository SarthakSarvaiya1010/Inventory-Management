import { createSlice } from "@reduxjs/toolkit";
import {
  ProductListAction,
  ProductDeleteAction,
  ProductDeleteListAction,
  PermanentProductDelete,
  ProductAddAction,
  ProductEditDataAction,
  ProductEditAction,
} from "./ProductThunk";

const initialState = {
  isLoading: false,
  productList: [],
  productEdit: [],
  productDeletList: [],
  DeletedProductListLoader: false,
  ErrorMessage: [],
  SucessMessage: [],
  SuccessMessageProductDelete: [],
};
const ProductSlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [ProductListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [ProductListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.SucessMessage = [];
        state.productList = data;
      }
      console.log("payload", payload?.payload?.response?.data);
    },
    [ProductListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },

    [ProductDeleteAction.pending]: (state) => {
      state.isLoading = true;
    },
    [ProductDeleteAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.SuccessMessageProductDelete = data;
    },
    [ProductDeleteAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [ProductDeleteListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [ProductDeleteListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.productDeletList = data;
      state.DeletedProductListLoader = true;
    },
    [ProductDeleteListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [PermanentProductDelete.pending]: (state) => {
      state.isLoading = true;
    },
    [PermanentProductDelete.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.SuccessMessageProductDelete = data;
    },
    [PermanentProductDelete.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [ProductAddAction.pending]: (state) => {
      state.isLoading = true;
    },
    [ProductAddAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.SucessMessage = data;
      }
    },
    [ProductAddAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.ErrorMessage = data;
    },
    [ProductEditDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [ProductEditDataAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.SucessMessage = data;
      }
    },
    [ProductEditDataAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [ProductEditAction.pending]: (state) => {
      state.isLoading = true;
    },
    [ProductEditAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.productEdit = data;
      }
    },
    [ProductEditAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
  },
});

export default ProductSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = ProductSlice.actions;
