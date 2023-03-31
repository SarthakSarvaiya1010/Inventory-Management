import { createSlice } from "@reduxjs/toolkit";
import { TaxListAction } from "./TaxThunk";

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
  },
});

export default TaxSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = TaxSlice.actions;
