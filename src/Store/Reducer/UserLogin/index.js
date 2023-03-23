import {
  AUTH,
  AUTHFAILED,
  FAILED_ADMIN_LIST,
  RESET_PASSWORD,
  SET_PASSWORD,
} from "../../ActionTypes/index";
const initialstate = {
  LoginData: [],
  ResetPasswordMassge: [],
  setPassword: [],
  FailedLoginData: [],
  AuthError: [],
};

const UserLoginReducer = (state = initialstate, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        LoginData: action.payload.data,
        AuthError: [],
      };
    case RESET_PASSWORD:
      return {
        ...state,
        ResetPasswordMassge: action.payload.data,
      };
    case SET_PASSWORD:
      return {
        ...state,
        setPassword: action.payload.data,
      };
    case FAILED_ADMIN_LIST:
      return {
        ...state,
        AuthError: action.payload.data,
        LoginData: [],
      };
    case AUTHFAILED:
      return {
        ...state,
        FailedLoginData: action?.payload?.data,
      };
    default:
      return state;
  }
};
export default UserLoginReducer;
