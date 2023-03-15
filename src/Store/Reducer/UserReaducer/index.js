import {
  USER_LIST,
  USER_DELTE_LIST,
  USER_DELETE,
  USER_EDIT,
  USER_ADD,
  USER_GET_BY_UUID,
  LIST_LOADER,
  FAILED_ADMIN_LIST,
} from "../../ActionTypes";

const initialstate = {
  UserData: [],
  UserDeleteList: [],
  UserDataByuuid: [],
  SucessMessage: [],
  ErrorMessage: [],
  loder: true,
  Loader: false,
};

const UserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LIST_LOADER:
      return {
        ...state,
        UserData: action.payload,
        Loader: true,
      };
    case FAILED_ADMIN_LIST:
      return {
        ...state,
        ErrorMessage: action.payload,
      };
    case USER_LIST:
      return {
        ...state,
        UserData: action.payload,
        UserDataByuuid: [],
        SucessMessage: [],
        ErrorMessage: [],
        loder: true,
        Loader: false,
      };
    case USER_DELTE_LIST:
      return {
        ...state,
        UserDeleteList: action.payload,
        Loader: false,
        loder: false,
      };
    case USER_ADD:
      return {
        ...state,
        SucessMessage: action.payload,
      };
    case USER_EDIT:
      return {
        ...state,
        SucessMessage: action.payload,
      };
    case USER_GET_BY_UUID:
      return {
        ...state,
        UserDataByuuid: action.payload,
        loder: false,
      };
    case USER_DELETE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default UserReducer;
