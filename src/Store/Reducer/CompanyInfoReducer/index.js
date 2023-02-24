import {
  COMPANY_INFO,
  COMPANY_INFO_BY_ID,
  COMPANY_INFO_EDIT,
  COMPANY_DELETE,
} from "../../ActionTypes";

const initialstate = {
  CompanyInfo: [],
  CompanyInfoId: [],
  loder: true,
};

const CompanyInfoReducer = (state = initialstate, action) => {
  switch (action.type) {
    case COMPANY_INFO:
      return {
        ...state,
        CompanyInfo: action.payload,
        loder: true,
      };
    case COMPANY_INFO_BY_ID:
      return {
        ...state,
        CompanyInfoId: action.payload,
        loder: true,
      };

    case COMPANY_INFO_EDIT:
      return {
        ...state,
        ...action.payload,
      };
    case COMPANY_DELETE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default CompanyInfoReducer;
