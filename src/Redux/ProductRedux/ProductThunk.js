import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const ProductListAction = createAsyncThunk(
  "userAction/ProductList",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/products`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
        params: data
          ? {
              searchKeyword: data.search,
              limit: data.limit,
              page: data.pageNumber,
              orderByString: data.orderByString,
            }
          : null,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const ProductDeleteListAction = createAsyncThunk(
  "userAction/DelteProductList",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/delete/products`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
        params: data
          ? {
              searchKeyword: data.search,
              limit: data.limit,
              page: data.pageNumber,
              orderByString: data.orderByString,
            }
          : null,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ProductDeleteAction = createAsyncThunk(
  "userAction/ProductDelete",
  async (Product_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/delete/products/${Product_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const PermanentProductDelete = createAsyncThunk(
  "userAction/ProductDelete",
  async (Product_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/permanent/delete/products/${Product_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const ProductAddAction = createAsyncThunk(
  "userAction/ProductAdd",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`products`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const ProductEditAction = createAsyncThunk(
  "userAction/ProductAdd",
  async (Product_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/products/${Product_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const ProductEditDataAction = createAsyncThunk(
  "userAction/ProductAdd",
  async (data, Product_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.put(`/edit/products/${Product_id}`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
