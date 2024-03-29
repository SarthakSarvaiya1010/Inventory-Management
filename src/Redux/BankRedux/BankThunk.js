import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const BankInfoAction = createAsyncThunk(
  "userAction/BankInfo",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/bank`, {
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
      return rejectWithValue(error?.response);
    }
  }
);
export const AddBankInfoAction = createAsyncThunk(
  "userAction/AddBankInfo",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/bank`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const BankInfoBypurchase_idAction = createAsyncThunk(
  "userAction/BankInfoBypurchase_id",
  async (id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/bank/${id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
