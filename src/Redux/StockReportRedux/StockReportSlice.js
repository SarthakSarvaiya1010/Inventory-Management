import { createSlice } from "@reduxjs/toolkit";
import { StockReportListAction } from "./StockReportThunk";

const initialState = {
  isLoading: false,
  Stock: [],
};
const StockReportSlice = createSlice({
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
      state.Stock = data;
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

export default StockReportSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = StockReportSlice.actions;
