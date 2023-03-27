import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const InvoiceListAction = createAsyncThunk(
  "userAction/CustomerList",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/invoicelist`, {
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
export const GetinvoiceAddPageAction = createAsyncThunk(
  "userAction/invoiceAdd",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/getinvoicepage`, {
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
export const GetinvoiceEditDataAction = createAsyncThunk(
  "userAction/invoiceEdit",
  async (Invoice_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/invoicelistbyid/${Invoice_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const AddInvoiceData = createAsyncThunk(
  "userAction/AddInvoice",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/addinvoice`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetDeletedInvoiceList = createAsyncThunk(
  "userAction/DeletedInvoice",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/invoiceDeletelist`, {
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
export const DeleteInvoice = createAsyncThunk(
  "userAction/DeleteList",
  async (invoice_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/DeleteInvoice/${invoice_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const PermanentDeleteInvoice = createAsyncThunk(
  "userAction/PermanentDelete",
  async (invoice_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.delete(`/PermanentDeleteInvoice/${invoice_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const UpdateInvoiceData = createAsyncThunk(
  "userAction/UpdateInvoice",
  async (invoice_id, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.put(`/UpdateInvoiceData/${invoice_id}`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const PrintInvoiceData = createAsyncThunk(
  "userAction/PrintInvoice",
  async (data, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.post(`/printinvoice`, data, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
