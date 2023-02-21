import {
  INVOICE_LIST,
  GET_INVOICE_PAGE,
  ADD_INVOICE,
  GET_DELETED_INVOICE,
  DELETE_INVOICE,
  PARMANENT_DELETE_INVOICE,
} from "../../ActionTypes";

const initialstate = {
  invoiceList: [],
  GetInvoicePagData: [],
  InvoicePdf: [],
  DeletedInvoiceList: [],
  SucessDeletedInvoiceData: [],
  SucessPermanentDeletedData: [],
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
    case ADD_INVOICE:
      console.log("actionpayload,", action.payload);
      return {
        ...state,
        InvoicePdf: action.payload,
      };
    case ADD_INVOICE:
      console.log("actionpayload,", action.payload);
      return {
        ...state,
        InvoicePdf: action.payload,
      };
    case GET_DELETED_INVOICE:
      console.log("actionpayload,", action.payload);
      return {
        ...state,
        DeletedInvoiceList: action.payload,
      };
    case DELETE_INVOICE:
      return {
        ...state,
        SucessDeletedInvoiceData: action.payload,
      };
    case PARMANENT_DELETE_INVOICE:
      return {
        ...state,
        SucessPermanentDeletedData: action.payload,
      };
    default:
      return state;
  }
};
export default InvoiceReducer;
