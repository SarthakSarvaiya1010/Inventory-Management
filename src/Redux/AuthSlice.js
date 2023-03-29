import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  isLoading: false,
  LoginData: [],
  ResetPasswordMassge: [],
  setPassword: [],
  FailedLoginData: [],
  AuthError: [],
  passwordLinkStatus: [],
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
export const resetPassword = createAsyncThunk(
  "userAction/resetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await api.post(`/resetpassword`, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const setPassword = createAsyncThunk(
  "userAction/setPassword",
  async (id, data, thunkAPI) => {
    try {
      const res = await api.post(`setpassword/${id}`, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const quickLogin = createAsyncThunk(
  "userAction/quickLogin",
  async (data, thunkAPI) => {
    try {
      const res = await api.post(`/quicklogin`, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const resetPasswordlinkcheck = createAsyncThunk(
  "userAction/resetPasswordlinkcheck",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/resetpasswordTimeCheck/${id}`);
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
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.ResetPasswordMassge = data;
    },
    [resetPassword.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.FailedLoginData = data;
    },
    [setPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [setPassword.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.setPassword = data;
    },
    [setPassword.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.FailedLoginData = data;
    },
    [quickLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [quickLogin.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.LoginData = data;
    },
    [quickLogin.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.FailedLoginData = data;
    },
    [resetPasswordlinkcheck.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPasswordlinkcheck.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.passwordLinkStatus = data;
    },
    [resetPasswordlinkcheck.rejected]: (state, payload) => {
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
