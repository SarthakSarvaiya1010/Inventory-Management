import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const userListAction = createAsyncThunk(
  "userAction/CompanyList",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/users`, {
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
export const userGetByuuidAction = createAsyncThunk(
  "userAction/userGetByuuid",
  async (user_uuid, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/users/${user_uuid}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const userGetByuuidDataAction = createAsyncThunk(
  "userAction/userGetByuuidData",
  async (user_uuid, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/users/${user_uuid}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const userDelteListAction = createAsyncThunk(
  "userAction/userDelteList",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/delete/users`, {
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
export const userDeleteAction = createAsyncThunk(
  "userAction/userDeleteActD",
  async (user_id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/delete/users/${user_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const userDeletepermanentAction = createAsyncThunk(
  "userAction/userDeleteAct",
  async (user_id, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/permanent/delete/users/${user_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const UserAddAction = createAsyncThunk(
  "userAction/UserAddListAC",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/users`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response);
    }
  }
);
export const UserEditAction = createAsyncThunk(
  "userAction/UserEditDataAct",
  async (data, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    const user_uuid = localStorage.getItem("user_uuid");
    try {
      const res = await api.put(`/edit/users/${user_uuid}`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
