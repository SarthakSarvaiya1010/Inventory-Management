import { createSlice } from "@reduxjs/toolkit";
import { StockReportListAction } from "./StockReportThunk";

const initialState = {
  isLoading: false,
  TaxList: [],
};
const TaxSlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [StockReportListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [StockReportListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.TaxList = data;
    },
    [StockReportListAction.rejected]: (state, payload) => {
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
