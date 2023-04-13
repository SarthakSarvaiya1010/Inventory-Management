import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const BankInfoAction = createAsyncThunk(
  "userAction/BankInfo",
  async (data, thunkAPI) => {
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
      console.log(error);
      return error;
    }
  }
);
export const AddBankInfoAction = createAsyncThunk(
  "userAction/AddBankInfo",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/bank`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const BankInfoBypurchase_idAction = createAsyncThunk(
  "userAction/BankInfoBypurchase_id",
  async (id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/bank/${id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
