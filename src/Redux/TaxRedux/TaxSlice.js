import { createSlice } from "@reduxjs/toolkit";
import {
  TaxListAction,
  TaxDelectListAction,
  TaxDeleteAction,
  TaxAddAction,
  TaxInfoEditAction,
  PermanentTaxDeleteAction,
  TaxEditAction,
} from "./TaxThunk";

const initialState = {
  isLoading: false,
  TaxList: [],
  TaxEdit: [],
  TaxDeletList: [],
  DeletedTaxLoader: false,
  loder: false,
  ErrorMessage: [],
  SucessMessage: [],
  SuccessDeleteTaxMessage: [],
};
const TaxSlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [TaxListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [TaxListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.TaxList = data;
    },
    [TaxListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [TaxEditAction.pending]: (state) => {
      state.isLoading = true;
    },
    [TaxEditAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.TaxList = data;
    },
    [TaxEditAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [TaxDelectListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [TaxDelectListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.TaxDeletList = data;
      state.loder = false;
      state.DeletedTaxLoader = true;
    },
    [TaxDelectListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [TaxDeleteAction.pending]: (state) => {
      state.isLoading = true;
    },
    [TaxDeleteAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.TaxDeletList = data;
      state.loder = false;
      state.DeletedTaxLoader = true;
    },
    [TaxDeleteAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [TaxAddAction.pending]: (state) => {
      state.isLoading = true;
    },
    [TaxAddAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.SucessMessage = data;
    },
    [TaxAddAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [TaxInfoEditAction.pending]: (state) => {
      state.isLoading = true;
    },
    [TaxInfoEditAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.SucessMessage = data;
    },
    [TaxInfoEditAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [PermanentTaxDeleteAction.pending]: (state) => {
      state.isLoading = true;
    },
    [PermanentTaxDeleteAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.SuccessDeleteTaxMessage = data;
    },
    [PermanentTaxDeleteAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
  },
});

export default TaxSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = TaxSlice.actions;
