import { createSlice } from "@reduxjs/toolkit";
import {
  BankInfoAction,
  AddBankInfoAction,
  BankInfoBypurchase_idAction,
} from "./BankThunk";

const initialState = {
  isLoading: false,
  BankInfo: [],
  ErrorMessage: [],
  SucessMessage: [],
  BankInfoBypurchase_id: [],

  loder: true,
};

const BankSlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [BankInfoAction.pending]: (state) => {
      state.isLoading = true;
    },
    [BankInfoAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.BankInfo = data;
        state.ErrorMessage = [];
        state.SucessMessage = [];
      }
    },
    [BankInfoAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [AddBankInfoAction.pending]: (state) => {
      state.isLoading = true;
    },
    [AddBankInfoAction.fulfilled]: (state, payload) => {
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
    [AddBankInfoAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [BankInfoBypurchase_idAction.pending]: (state) => {
      state.isLoading = true;
    },
    [BankInfoBypurchase_idAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.BankInfoBypurchase_id = data;
      }
    },
    [BankInfoBypurchase_idAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
  },
});

export default BankSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = BankSlice.actions;
