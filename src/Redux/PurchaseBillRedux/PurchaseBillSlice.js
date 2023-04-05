import { createSlice } from "@reduxjs/toolkit";
import {
  PurchaseBillListAction,
  AddIPurchaseBill,
  GetPurchaseEditDataAction,
  UpdatePurchaseData,
} from "./PurchaseBillThank";

const initialState = {
  isLoading: false,
  PurchaseBillList: [],
  Loader: false,
  GetInvoicePagData: [],
  PurchaseEdit: [],
  DeletedInvoiceList: [],
  DeletedInvoiceLoader: false,
  SucessMessageOfInvoiceDelete: [],
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
  },
});

export default PurchaseBillSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = PurchaseBillSlice.actions;
