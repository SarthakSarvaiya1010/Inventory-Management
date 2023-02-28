import {
  USER_LIST,
  USER_DELTE_LIST,
  USER_DELETE,
  USER_ADD,
  USER_GET_BY_UUID,
} from "../../ActionTypes";

const initialstate = {
  UserData: [],
  UserDeleteList: [],
  UserDataByuuid: [],
  loder: true,
};

const UserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        UserData: action.payload,
        loder: true,
      };
    case USER_DELTE_LIST:
      return {
        ...state,
        UserDeleteList: action.payload,
        loder: false,
      };
    case USER_ADD:
      return {
        ...state,
        ...action.payload,
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
