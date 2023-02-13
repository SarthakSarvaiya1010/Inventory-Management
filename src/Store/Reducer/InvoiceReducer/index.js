import { INVOICE_LIST, GET_INVOICE_PAGE } from "../../ActionTypes";

const initialstate = {
  invoiceList: [],
  GetInvoicePagData: [],
};

const InvoiceReducer = (state = initialstate, action) => {
  switch (action.type) {
    case INVOICE_LIST:
      return {
        ...state,
        invoiceList: action.payload,
      };
    case GET_INVOICE_PAGE:
      console.log("actionpayload,",action.payload)
      return {
        ...state,
        GetInvoicePagData: action.payload,
      };
    default:
      return state;
  }
};
export default InvoiceReducer;
