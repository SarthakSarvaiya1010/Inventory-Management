import { TAX_LIST, TAX_EDIT } from "../../ActionTypes";

const initialstate = {
  TaxList: [],
  TaxEdit: [],
  loder: true,
};

const TaxReducer = (state = initialstate, action) => {
  switch (action.type) {
    case TAX_LIST:
      return {
        ...state,
        TaxList: action.payload,
        loder: true,
      };
    case TAX_EDIT:
      return {
        ...state,
        TaxEdit: action.payload,
        loder: false,
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
export default TaxReducer;
