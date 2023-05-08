import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  isLoading: false,
  LoginData: [],
  ResetPasswordMassge: [],
  setPassword: [],
  SucessMessage: [],
  FailedLoginData: [],
  AuthError: [],
  passwordLinkStatus: [],
};

export const userLogin = createAsyncThunk(
  "userAction/userlogin",
  async (data, { rejectWithValue }, thunkAPI) => {
    try {
      const res = await api.post(`/login`, data);
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "userAction/resetPassword",
  async (data, { rejectWithValue }, thunkAPI) => {
    try {
      const res = await api.post(`/resetpassword`, data);
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const setPassword = createAsyncThunk(
  "userAction/setPassword",
  async (data, { rejectWithValue }, thunkAPI) => {
    try {
      const Password_id = localStorage.getItem("Password_id");

      const res = await api.post(`setpassword/${Password_id}`, data);
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const quickLogin = createAsyncThunk(
  "userAction/quickLogin",
  async (data, { rejectWithValue }, thunkAPI) => {
    try {
      const res = await api.post(`/quicklogin`, data);
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const resetPasswordlinkcheck = createAsyncThunk(
  "userAction/resetPasswordlinkcheck",
  async (id, { rejectWithValue }, thunkAPI) => {
    try {
      const res = await api.get(`/resetpasswordTimeCheck/${id}`);
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const userLogout = createAsyncThunk(
  "userAction/userLogout",
  async (_, { rejectWithValue }, thunkAPI) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const res = await api.get(`/logout`, {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error?.response);
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
      state.LoginData = data;
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
      state.passwordLinkStatus = data;
    },
    [resetPasswordlinkcheck.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.FailedLoginData = data;
    },
    [userLogout.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogout.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.SucessMessage = data;
    },
    [userLogout.rejected]: (state, payload) => {
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
