import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const PurchaseBillListAction = createAsyncThunk(
  "userAction/PurchaseBillList",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/purchasebill`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
        params: data
          ? {
              searchKeyword: data.search ? data.search : null,
              limit: data.limit,
              page: data.pageNumber,
              orderByString: data.orderByString,
              date: data?.date,
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
export const PurchaseBillDeleteListAction = createAsyncThunk(
  "userAction/PurchaseBillDeleteListAction",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/purchasebilldeletelist`, {
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
export const AddIPurchaseBill = createAsyncThunk(
  "userAction/AddInvoice",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/addpurchasebill`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const GetPurchaseEditDataAction = createAsyncThunk(
  "userAction/PurchaseEdit",
  async (Purchase_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/purchaselistbyid/${Purchase_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const UpdatePurchaseData = createAsyncThunk(
  "userAction/UpdatePurchaseData",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    const Purchase_id = localStorage.getItem("purchaseId");
    try {
      const res = await api.put(`/updatepurchasedata/${Purchase_id}`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const DeletePurchase = createAsyncThunk(
  "userAction/DeletePurchase",
  async (purchase_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/deletepurchase/${purchase_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const PermanentDeletePurchase = createAsyncThunk(
  "userAction/PermanentDeletePurchase",
  async (purchase_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/permanentDeletepurchase/${purchase_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const GetpurchaseAddPageAction = createAsyncThunk(
  "userAction/GetpurchaseAddPageAction",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/getpurchasepage`, {
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
