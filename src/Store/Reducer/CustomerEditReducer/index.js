import { CUSTOMER_EDIT } from "../../ActionTypes";

const initialstate = {
  customerEdit: [],
};

const CustomerEditReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CUSTOMER_EDIT:
      return {
        ...state,
        customerEdit: action.payload,
      };
    default:
      return state;
  }
};
export default CustomerEditReducer;
