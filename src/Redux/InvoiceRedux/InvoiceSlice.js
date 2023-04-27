import { createSlice } from "@reduxjs/toolkit";
import {
  InvoiceListAction,
  GetinvoiceAddPageAction,
  GetinvoiceEditDataAction,
  AddInvoiceData,
  GetDeletedInvoiceList,
  DeleteInvoice,
  PermanentDeleteInvoice,
  UpdateInvoiceData,
  PrintInvoiceData,
} from "./InvoiceThunk";

const initialState = {
  isLoading: false,
  invoiceList: [],
  Loader: false,
  GetInvoicePagData: [],
  invoiceEdit: [],
  InvoicePdf: [],
  DeletedInvoiceList: [],
  DeletedInvoiceLoader: false,
  SucessMessageOfInvoiceDelete: [],
  PrintInvoicePdf: [],
};
const InvoiceSlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [InvoiceListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [InvoiceListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.invoiceList = data;
      state.InvoicePdf = [];
      state.SucessMessageOfInvoiceDelete = [];
      state.ErrorMessage = [];
      state.SucessMessage = [];
    },
    [InvoiceListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [GetinvoiceAddPageAction.pending]: (state) => {
      state.isLoading = true;
    },
    [GetinvoiceAddPageAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.GetInvoicePagData = data;
    },
    [GetinvoiceAddPageAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [GetinvoiceEditDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [GetinvoiceEditDataAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.invoiceEdit = data;
    },
    [GetinvoiceEditDataAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [AddInvoiceData.pending]: (state) => {
      state.isLoading = true;
    },
    [AddInvoiceData.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.InvoicePdf = data;
      }
    },
    [AddInvoiceData.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [GetDeletedInvoiceList.pending]: (state) => {
      state.isLoading = true;
    },
    [GetDeletedInvoiceList.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.DeletedInvoiceList = data;
    },
    [GetDeletedInvoiceList.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [DeleteInvoice.pending]: (state) => {
      state.isLoading = true;
    },
    [DeleteInvoice.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.SucessMessageOfInvoiceDelete = data;
    },
    [DeleteInvoice.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [PermanentDeleteInvoice.pending]: (state) => {
      state.isLoading = true;
    },
    [PermanentDeleteInvoice.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.SucessMessageOfInvoiceDelete = data;
    },
    [PermanentDeleteInvoice.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [UpdateInvoiceData.pending]: (state) => {
      state.isLoading = true;
    },
    [UpdateInvoiceData.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.InvoicePdf = data;
      }
    },
    [UpdateInvoiceData.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [PrintInvoiceData.pending]: (state) => {
      state.isLoading = true;
    },
    [PrintInvoiceData.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      console.log("dataInvoiceListAction===>", data);
      state.PrintInvoicePdf = data;
    },
    [PrintInvoiceData.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
  },
});

export default InvoiceSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = InvoiceSlice.actions;
