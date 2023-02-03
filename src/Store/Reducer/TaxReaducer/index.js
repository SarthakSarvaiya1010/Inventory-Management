import { TAX_LIST, TAX_EDIT, TAX_DELETED_LIST } from "../../ActionTypes";

const initialstate = {
  TaxList: [],
  TaxEdit: [],
  TaxDeletList: [],
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
    case TAX_DELETED_LIST:
      return {
        ...state,
        TaxDeletList: action.payload,
      };

    default:
      return state;
  }
};
export default TaxReducer;
