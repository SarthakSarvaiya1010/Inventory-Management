import { CUSTOMER_LIST } from "../../ActionTypes";

const initialstate = {
  CoustomerList: [],
};

const CustomerListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CUSTOMER_LIST:
      return {
        ...state,
        CoustomerList: action.payload,
      };
    // case FAILED_ADMIN_LIST:
    //   return {
    //     ...state,
    //     AutherationError: action.payload.data,
    //   };

    default:
      return state;
  }
};

export default CustomerListReducer;
