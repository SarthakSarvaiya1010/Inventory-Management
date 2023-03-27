import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const TaxListAction = createAsyncThunk(
  "userAction/TaxList",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/tax`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
        params: data
          ? {
              searchKeyword: data.search ? data.search : null,
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
export const TaxEditAction = createAsyncThunk(
  "userAction/TaxList",
  async (Tax_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/tax/${Tax_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const TaxDelectListAction = createAsyncThunk(
  "userAction/TaxDelect",
  async (_, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/delete/tax`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const TaxDeleteAction = createAsyncThunk(
  "userAction/TaxDelect",
  async (Tax_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/delete/tax/${Tax_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const TaxAddAction = createAsyncThunk(
  "userAction/TaxDelect",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/add/tax`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const TaxInfoEditAction = createAsyncThunk(
  "userAction/TaxDelect",
  async (data, Tax_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.put(`/edit/tax/${Tax_id}`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const PermanentTaxDeleteAction = createAsyncThunk(
  "userAction/TaxDelect",
  async (Tax_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/delete/tax/${Tax_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
