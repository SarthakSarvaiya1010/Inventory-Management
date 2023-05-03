import { createSlice } from "@reduxjs/toolkit";
import {
  userListAction,
  userGetByuuidAction,
  userDeleteListAction,
  userDeleteAction,
  UserAddAction,
  UserEditAction,
  userGetByuuidDataAction,
  userDeletepermanentAction,
} from "./UserThunk";

const initialState = {
  isLoading: false,
  UserData: [],
  UserDeleteList: [],
  UserDataByuuid: [],
  UserquickData: [],
  SucessMessage: [],
  ErrorMessage: [],
  SuccessDeleteUserMessage: [],
  loder: true,
  Loader: false,
};

const UserSlice = createSlice({
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
    [userDeleteListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [userDeleteListAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.UserDeleteList = data;
    },
    [userDeleteListAction.rejected]: (state, payload) => {
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

      state.SuccessDeleteUserMessage = data;
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
    [userGetByuuidDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [userGetByuuidDataAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.UserquickData = data;
    },
    [userGetByuuidDataAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
    [userDeletepermanentAction.pending]: (state) => {
      state.isLoading = true;
    },
    [userDeletepermanentAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.SucessMessage = data;
    },
    [userDeletepermanentAction.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.ErrorMessage = data;
    },
  },
});

export default UserSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = UserSlice.actions;
