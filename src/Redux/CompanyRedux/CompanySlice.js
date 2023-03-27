import { createSlice } from "@reduxjs/toolkit";
import {
  CompanyInfoAction,
  DeleteCompanyInfoAction,
  CompanyInfoByIdAction,
  AddCompanyInfoAction,
  CompanyInfoEditAction,
  CompanyDeleteAction,
  PermanentCompanyDeleteAction,
} from "./CompanyThunk";

const initialState = {
  isLoading: false,
  CompanyInfo: [],
  DeleteCompanyInfo: [],
  CompanyInfoId: [],
  SucessMessageOfEditCompanyInfo: [],
  ErrorMessageOfEditComapanyInfo: [],
  SucessMessage: [],
  ErrorMessage: [],
  loder: true,
};

const CompanySlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [CompanyInfoAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CompanyInfoAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.CompanyInfo = data;
    },
    [CompanyInfoAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [DeleteCompanyInfoAction.pending]: (state) => {
      state.isLoading = true;
    },
    [DeleteCompanyInfoAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.DeleteCompanyInfo = data;
    },
    [DeleteCompanyInfoAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [CompanyInfoByIdAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CompanyInfoByIdAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.CompanyInfoId = data;
    },
    [CompanyInfoByIdAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [AddCompanyInfoAction.pending]: (state) => {
      state.isLoading = true;
    },
    [AddCompanyInfoAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      console.log("data", data);
    },
    [AddCompanyInfoAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [CompanyInfoEditAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CompanyInfoEditAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.SucessMessageOfEditCompanyInfo = data;
    },
    [CompanyInfoEditAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [CompanyDeleteAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CompanyDeleteAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      console.log("data", data);
    },
    [CompanyDeleteAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [PermanentCompanyDeleteAction.pending]: (state) => {
      state.isLoading = true;
    },
    [PermanentCompanyDeleteAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      console.log("data", data);
    },
    [PermanentCompanyDeleteAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
  },
});

export default CompanySlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = CompanySlice.actions;
