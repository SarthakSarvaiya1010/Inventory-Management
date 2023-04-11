import { createSlice } from "@reduxjs/toolkit";
import {
  PurchaseBillListAction,
  AddIPurchaseBill,
  GetPurchaseEditDataAction,
  UpdatePurchaseData,
  PurchaseBillDeleteListAction,
  DeletePurchase,
  GetpurchaseAddPageAction,
  PermanentDeletePurchase,
} from "./PurchaseBillThank";

const initialState = {
  isLoading: false,
  PurchaseBillList: [],
  Loader: false,
  GetPurchasePagData: [],
  PurchaseEdit: [],
  DeletedpurchaseList: [],
  DeletedInvoiceLoader: false,
  SucessMessageOfPurchaseDelete: [],
  SucessMessage: [],
  ErrorMessage: [],
};
const PurchaseBillSlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [PurchaseBillListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [PurchaseBillListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.PurchaseBillList = data;
      state.PurchaseEdit = [];
      state.SucessMessage = [];
    },
    [PurchaseBillListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [AddIPurchaseBill.pending]: (state) => {
      state.isLoading = true;
    },
    [AddIPurchaseBill.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.SucessMessage = data;
      }
    },
    [AddIPurchaseBill.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [GetPurchaseEditDataAction.fulfilled]: (state, payload) => {
      state.isLoading = false;

      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.PurchaseEdit = data;
      }
    },
    [GetPurchaseEditDataAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },

    [UpdatePurchaseData.pending]: (state) => {
      state.isLoading = true;
    },
    [UpdatePurchaseData.fulfilled]: (state, payload) => {
      state.isLoading = false;

      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.SucessMessage = data;
      }
    },
    [UpdatePurchaseData.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },

    [PurchaseBillDeleteListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [PurchaseBillDeleteListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;

      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.DeletedpurchaseList = data;
      }
    },
    [PurchaseBillDeleteListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [DeletePurchase.pending]: (state) => {
      state.isLoading = true;
    },
    [DeletePurchase.fulfilled]: (state, payload) => {
      state.isLoading = false;

      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.SucessMessageOfPurchaseDelete = data;
      }
    },
    [DeletePurchase.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [PermanentDeletePurchase.pending]: (state) => {
      state.isLoading = true;
    },
    [PermanentDeletePurchase.fulfilled]: (state, payload) => {
      state.isLoading = false;

      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.SucessMessageOfPurchaseDelete = data;
      }
    },
    [PermanentDeletePurchase.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [GetpurchaseAddPageAction.pending]: (state) => {
      state.isLoading = true;
    },
    [GetpurchaseAddPageAction.fulfilled]: (state, payload) => {
      state.isLoading = false;

      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.GetPurchasePagData = data;
      }
    },
    [GetpurchaseAddPageAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
  },
});

export default PurchaseBillSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = PurchaseBillSlice.actions;
