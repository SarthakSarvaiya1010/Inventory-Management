import {
  CUSTOMER_EDIT,
  CUSTOMER_DELETED_LIST,
  CUSTOMER_LIST,
  CUSTOMER_DELETE,
} from "../../ActionTypes";

const initialstate = {
  customerEdit: [],
  customerDeletedList: [],
  loder: true,
};

const CustomerEditReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CUSTOMER_EDIT:
      return {
        ...state,
        customerEdit: action.payload,
        loder: false,
      };
    case CUSTOMER_DELETED_LIST:
      console.log("12345", action.payload);
      return {
        ...state,
        customerDeletedList: action.payload,
      };
    case CUSTOMER_LIST:
      return {
        ...state,
        loder: true,
      };
    case CUSTOMER_DELETE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default CustomerEditReducer;
