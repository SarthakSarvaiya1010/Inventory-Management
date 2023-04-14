import { createSlice } from "@reduxjs/toolkit";
import { BankInfoListAction, AddBankInfoAction } from "./BankInfoThunk";

const initialState = {
  isLoading: false,
  BankInfoList: [],
  ErrorMessage: [],
  SucessMessage: [],
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
  },
});

export default BankInfoSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = BankInfoSlice.actions;
