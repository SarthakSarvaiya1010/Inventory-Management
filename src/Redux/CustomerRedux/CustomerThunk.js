import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const CustomerListAction = createAsyncThunk(
  "userAction/CustomerList",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/customers`, {
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
export const CustomerAddAction = createAsyncThunk(
  "userAction/CustomerAdd",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/customers`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const CustomerDelectListAction = createAsyncThunk(
  "userAction/CustomerDelect",
  async (_, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/delete/customers`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const CustomerEditAction = createAsyncThunk(
  "userAction/CustomerEdit",
  async (customers_id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/customers/${customers_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const CustomerEditDataAction = createAsyncThunk(
  "userAction/CustomerEditData",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    const Customer_id = localStorage.getItem("customer_id");
    console.log("Customer_id*()_", Customer_id);
    try {
      const res = await api.put(`/edit/customers/${Customer_id}`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const CustomerDeleteAction = createAsyncThunk(
  "userAction/DeleteAction",
  async (id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/delete/customers/${id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const CustomerNameListAction = createAsyncThunk(
  "userAction/CustomerNameList",
  async (_, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/customersname`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const PermanentCustomerDeleteAction = createAsyncThunk(
  "userAction/PermanentCustomer",
  async (id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/permanent/delete/customers/${id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
