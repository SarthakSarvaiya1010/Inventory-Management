import { INVOICE_LIST } from "../../ActionTypes";

const initialstate = {
  invoiceList: [],
};

const InvoiceReducer = (state = initialstate, action) => {
  switch (action.type) {
    case INVOICE_LIST:
      return {
        ...state,
        invoiceList: action.payload,
      };
    default:
      return state;
  }
};
export default InvoiceReducer;
