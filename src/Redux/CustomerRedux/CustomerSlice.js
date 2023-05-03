import { createSlice } from "@reduxjs/toolkit";
import {
  CustomerListAction,
  CustomerAddAction,
  CustomerDelectListAction,
  CustomerEditAction,
  CustomerEditDataAction,
  CustomerDeleteAction,
  PermanentCustomerDeleteAction,
  CustomerNameListAction,
} from "./CustomerThunk";

const initialState = {
  isLoading: false,
  CoustomerList: [],
  loder: true,
  Loader: false,
  customerEdit: [],
  customerDeletedList: [],
  DeletedCustomerLoader: false,
  SucessMessage: [],
  ErrorMessage: [],
  SuccessMessageOfCustomerDeleted: [],
  customerName: [],
};
const CustomerSlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [CustomerListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CustomerListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.CoustomerList = data;
      state.SucessMessage = [];
      state.ErrorMessage = [];
    },
    [CustomerListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [CustomerAddAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CustomerAddAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.SucessMessage = data;
    },
    [CustomerAddAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [CustomerDelectListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CustomerDelectListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.customerDeletedList = data;
    },
    [CustomerDelectListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [CustomerEditAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CustomerEditAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.customerEdit = data;
    },
    [CustomerEditAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [CustomerEditDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CustomerEditDataAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.SucessMessage = data;
    },
    [CustomerEditDataAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [CustomerDeleteAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CustomerDeleteAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.SuccessMessageOfCustomerDeleted = data;
    },
    [CustomerDeleteAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [PermanentCustomerDeleteAction.pending]: (state) => {
      state.isLoading = true;
    },
    [PermanentCustomerDeleteAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.SuccessMessageOfCustomerDeleted = data;
    },
    [PermanentCustomerDeleteAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [CustomerNameListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [CustomerNameListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.customerName = data;
    },
    [CustomerNameListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
  },
});

export default CustomerSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = CustomerSlice.actions;
