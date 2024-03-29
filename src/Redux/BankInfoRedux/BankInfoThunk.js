import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const BankInfoListAction = createAsyncThunk(
  "userAction/BankInfoList",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    let user_id = accessToken?.user_id;
    try {
      const res = await api.get(`/bankinfo/${user_id}`, {
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
  async (value, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    let data = {
      bank_name: value?.bank_name || null,
      balance: value?.balance || null,
      user_id: accessToken?.user_id || null,
      primary_bank: value?.primary_bank ? 1 : 0,
    };
    try {
      const res = await api.post(`/bankinfo`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const BankInfoEditAction = createAsyncThunk(
  "userAction/BankInfoEdit",
  async (id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/bankinfoedit/${id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const BankInfoEditDataAction = createAsyncThunk(
  "userAction/BankInfoEditData",
  async (value, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    const id = localStorage.getItem("bank_id");
    let data = {
      bank_name: value?.bank_name || null,
      balance: value?.balance || null,
      user_id: accessToken?.user_id || null,
      primary_bank: value?.primary_bank ? 1 : 0,
    };
    try {
      const res = await api.put(`/bankinfoupdate/${id}`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const BankInfoDeleteDataAction = createAsyncThunk(
  "userAction/BankInfoDeleteData",
  async (id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

    try {
      const res = await api.delete(`/bankinfodelete/${id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const UpdateBalanceAction = createAsyncThunk(
  "userAction/UpdateBalanceAction",
  async (value, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    let data = {
      bank_name: value?.bank_name || null,
      balance: value?.balance || null,
      user_id: accessToken?.user_id || null,
    };
    try {
      const res = await api.put(`/balanceupdate`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
