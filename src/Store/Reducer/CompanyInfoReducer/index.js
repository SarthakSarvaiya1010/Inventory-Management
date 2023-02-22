import { COMPANY_INFO, COMPANY_INFO_EDIT } from "../../ActionTypes";

const initialstate = {
  CompanyInfo: [],
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
    case COMPANY_INFO_EDIT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default CompanyInfoReducer;
