import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  isLoading: false,
  LoginData: [],
  ResetPasswordMassge: [],
  setPassword: [],
  FailedLoginData: [],
  AuthError: [],
};

export const userLogin = createAsyncThunk(
  "userAction/userlogin",
  async (data, thunkAPI) => {
    try {
      const res = await api.post(`/login`, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const UserLoginSlice = createSlice({
  name: "userlogin",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.LoginData = data;
    },
    [userLogin.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.FailedLoginData = data;
    },
  },
});

export default UserLoginSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = UserLoginSlice.actions;
