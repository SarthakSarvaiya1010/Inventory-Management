import { USER_LIST, USER_DELTE_LIST, USER_DELETE } from "../../ActionTypes";

const initialstate = {
  UserData: [],
  UserDeleteList: [],
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
        loder: true,
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
