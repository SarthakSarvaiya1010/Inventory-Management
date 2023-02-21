import {
  TAX_LIST,
  TAX_ADD,
  TAX_EDIT,
  TAX_DELETED_LIST,
  TAX_DELETE,
  TAX_INFO_EDIT,
  PERMANENT_TAX_DELETE,
} from "../../ActionTypes";

const initialstate = {
  TaxList: [],
  TaxEdit: [],
  TaxAddSuccessData: [],
  TaxEditSucessData: [],
  TaxDeletList: [],
  TaxDeleteSuccessData: [],
  PermanentTaxDeleteData: [],
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
    case TAX_ADD:
      return {
        ...state,
        TaxAddSuccessData: action.payload,
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
    case TAX_DELETE:
      return {
        ...state,
        TaxDeleteSuccessData: action.payload,
      };
    case TAX_INFO_EDIT:
      return {
        ...state,
        TaxEditSucessData: action.payload,
      };
    case PERMANENT_TAX_DELETE:
      return {
        ...state,
        PermanentTaxDeleteData: action.payload,
      };
    default:
      return state;
  }
};
export default TaxReducer;
