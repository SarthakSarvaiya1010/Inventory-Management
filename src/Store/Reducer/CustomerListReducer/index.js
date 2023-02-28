import { CUSTOMER_LIST, LIST_LOADER } from "../../ActionTypes";

const initialstate = {
  CoustomerList: [],
  Loader: false,
};

const CustomerListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LIST_LOADER:
      return {
        ...state,
        CoustomerList: action.payload,
        Loader: true,
      };
    case CUSTOMER_LIST:
      return {
        ...state,
        CoustomerList: action.payload,
        Loader: false,
      };

    default:
      return state;
  }
};

export default CustomerListReducer;
