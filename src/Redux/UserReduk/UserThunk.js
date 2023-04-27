import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const userListAction = createAsyncThunk(
  "userAction/CompanyList",
  async (data, thunkAPI) => {
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
    }
  }
);
export const userGetByuuidAction = createAsyncThunk(
  "userAction/userGetByuuid",
  async (user_uuid, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/users/${user_uuid}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const userGetByuuidDataAction = createAsyncThunk(
  "userAction/userGetByuuidData",
  async (user_uuid, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/users/${user_uuid}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const userDelteListAction = createAsyncThunk(
  "userAction/userDelteList",
  async (data, thunkAPI) => {
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
    }
  }
);
export const userDeleteAction = createAsyncThunk(
  "userAction/userDelete",
  async (user_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/delete/users/${user_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const UserAddAction = createAsyncThunk(
  "userAction/UserAddList",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/users`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const UserEditAction = createAsyncThunk(
  "userAction/UserEditDataAct",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    const user_uuid = localStorage.getItem("user_uuid");
    try {
      const res = await api.put(`/edit/users/${user_uuid}`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
);
