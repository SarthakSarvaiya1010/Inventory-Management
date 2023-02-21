import {
  INVOICE_LIST,
  GET_INVOICE_PAGE,
  GET_INVOICE_EDIT_DATA,
} from "../../ActionTypes";

const initialstate = {
  invoiceList: [],
  GetInvoicePagData: [],
  invoiceEdit: [],
};

const InvoiceReducer = (state = initialstate, action) => {
  switch (action.type) {
    case INVOICE_LIST:
      return {
        ...state,
        invoiceList: action.payload,
      };
    case GET_INVOICE_PAGE:
      console.log("actionpayload,", action.payload);
      return {
        ...state,
        GetInvoicePagData: action.payload,
      };
    case GET_INVOICE_EDIT_DATA:
      console.log("actionpayload,", action.payload);
      return {
        ...state,
        invoiceEdit: action.payload,
      };
    default:
      return state;
  }
};
export default InvoiceReducer;
