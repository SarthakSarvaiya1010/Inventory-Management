import { createSlice } from "@reduxjs/toolkit";
import {
  BankInfoListAction,
  AddBankInfoAction,
  BankInfoEditAction,
  BankInfoEditDataAction,
  BankInfoDeleteDataAction,
  UpdateBalanceAction,
} from "./BankInfoThunk";

const initialState = {
  isLoading: false,
  BankInfoList: [],
  ErrorMessage: [],
  SucessMessage: [],
  BankInfoEdit: [],
  loder: true,
};

const BankInfoSlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [BankInfoListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [BankInfoListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.BankInfoList = data;
        state.BankInfoEdit = [];
        state.SucessMessage = [];
      }
    },
    [BankInfoListAction.rejected]: (state, payload) => {
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
    [BankInfoEditAction.pending]: (state) => {
      state.isLoading = true;
    },
    [BankInfoEditAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.ErrorMessage = payload?.payload?.response?.data;
      } else {
        state.BankInfoEdit = data;
      }
    },
    [BankInfoEditAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [BankInfoEditDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [BankInfoEditDataAction.fulfilled]: (state, payload) => {
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
    [BankInfoEditDataAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [BankInfoDeleteDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [BankInfoDeleteDataAction.fulfilled]: (state, payload) => {
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
    [BankInfoDeleteDataAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [UpdateBalanceAction.pending]: (state) => {
      state.isLoading = true;
    },
    [UpdateBalanceAction.fulfilled]: (state, payload) => {
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
    [UpdateBalanceAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
  },
});

export default BankInfoSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = BankInfoSlice.actions;
