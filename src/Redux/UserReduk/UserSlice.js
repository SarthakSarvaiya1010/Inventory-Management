import { createSlice } from "@reduxjs/toolkit";
import {
  userListAction,
  userGetByuuidAction,
  userDelteListAction,
  userDeleteAction,
  UserAddAction,
  UserEditAction,
} from "./UserThunk";

const initialState = {
  isLoading: false,
  UserData: [],
  UserDeleteList: [],
  UserDataByuuid: [],
  SucessMessage: [],
  ErrorMessage: [],
  loder: true,
  Loader: false,
};

const CompanySlice = createSlice({
  name: "userAction",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [userListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [userListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.UserData = data;
    },
    [userListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [userGetByuuidAction.pending]: (state) => {
      state.isLoading = true;
    },
    [userGetByuuidAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.loder = false;
      state.UserDataByuuid = data;
    },
    [userGetByuuidAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [userDelteListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [userDelteListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.UserDeleteList = data;
    },
    [userDelteListAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [userDeleteAction.pending]: (state) => {
      state.isLoading = true;
    },
    [userDeleteAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      console.log("data", data);
    },
    [userDeleteAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [UserAddAction.pending]: (state) => {
      state.isLoading = true;
    },
    [UserAddAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.SucessMessage = data;
    },
    [UserAddAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [UserEditAction.pending]: (state) => {
      state.isLoading = true;
    },
    [UserEditAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.SucessMessage = data;
    },
    [UserEditAction.rejected]: (state, payload) => {
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
