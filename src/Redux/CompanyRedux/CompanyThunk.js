import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const CompanyInfoAction = createAsyncThunk(
  "userAction/CompanyList",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/company_info`, {
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
      return rejectWithValue(error?.response);
    }
  }
);
export const DeleteCompanyInfoAction = createAsyncThunk(
  "userAction/DeleteCompany",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/delete/company_info`, {
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
      return rejectWithValue(error?.response);
    }
  }
);
export const CompanyInfoByIdAction = createAsyncThunk(
  "userAction/CompanyInfoById",
  async (company_id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/company_info/${company_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const AddCompanyInfoAction = createAsyncThunk(
  "userAction/AddCompanyInfo",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/add/company_info`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const CompanyInfoEditAction = createAsyncThunk(
  "userAction/EditAction",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    const company_id = window.localStorage.getItem("company_id");
    try {
      const res = await api.put(`/edit/company_info/${company_id}`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const CompanyDeleteAction = createAsyncThunk(
  "userAction/CompanyDeleteAction",
  async (company_id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/delete/company_info/${company_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const PermanentCompanyDeleteAction = createAsyncThunk(
  "userAction/PermanentCompany",
  async (company_id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(
        `/permanent/delete/company_info/${company_id}`,
        {
          headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
