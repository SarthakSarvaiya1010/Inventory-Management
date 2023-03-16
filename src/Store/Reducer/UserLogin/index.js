import { AUTH, AUTHFAILED, FAILED_ADMIN_LIST } from "../../ActionTypes/index";
const initialstate = {
  LoginData: [],
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
