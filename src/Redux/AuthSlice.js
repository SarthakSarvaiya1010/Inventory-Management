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
      return error;
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
      return error;
    }
  }
);
export const setPassword = createAsyncThunk(
  "userAction/setPassword",
  async (data, thunkAPI) => {
    try {
      const Password_id = localStorage.getItem("Password_id");

      const res = await api.post(`setpassword/${Password_id}`, data);
      return res;
    } catch (error) {
      return error;
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
      return error;
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
    [userLogin.rejected]: (state, payload) => {
      const {
        payload: { data },
      } = payload;
      state.FailedLoginData = data;
    },
    [userLogin.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.FailedLoginData = payload?.payload?.response?.data;
      } else {
        state.LoginData = data;
      }
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      if (payload?.payload?.name === "AxiosError") {
        state.FailedLoginData = payload?.payload?.response?.data;
      } else {
        state.ResetPasswordMassge = data;
      }
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
      if (payload?.payload?.name === "AxiosError") {
        state.FailedLoginData = payload?.payload?.response?.data;
      } else {
        state.setPassword = data;
      }
    },
    [setPassword.rejected]: (state, payload) => {
      state.isLoading = false;
      // const {
      // payload: { data },
      // } = payload;
      // state.FailedLoginData = data;
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

      if (payload?.payload?.name === "AxiosError") {
        state.FailedLoginData = payload?.payload?.response?.data;
      } else {
        state.passwordLinkStatus = data;
      }
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
