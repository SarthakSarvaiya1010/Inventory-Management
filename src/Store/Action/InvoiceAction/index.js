import {
  INVOICE_LIST,
  FAILED_ADMIN_LIST,
  GET_INVOICE_PAGE,
  FAILED_INVOICE_PAGE,
  GET_INVOICE_EDIT_DATA,
  ADD_INVOICE,
  FAILED_ADD_INVOICE,
  GET_DELETED_INVOICE,
  FAILED_GET_DELETED_INVOICE,
  DELETE_INVOICE,
  FAILED_DELETED_INVOICE,
  PARMANENT_DELETE_INVOICE,
  FAILED_PERMANENT_DELETE_INVOICE,
} from "../../ActionTypes/index";
import axios from "axios";

export const InvoiceListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  console.log("data", data);
  try {
    const InvoiceList = await axios.get("https://inventory-management-backend.onrender.com/invoicelist", {
      headers: { Authorization: `Bearer ${token}` },
      params: data
        ? {
            searchKeyword: data.search,
            limit: data.limit,
            page: data.pageNumber,
            orderByString: data.orderByString,
          }
        : null,
    });
    dispatch({
      type: INVOICE_LIST,
      payload: InvoiceList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const GetinvoiceAddPageAction = (AccessToken) => async (dispatch) => {
  const token = AccessToken;
  try {
    const GetInvoicepageData = await axios.get(
      "https://inventory-management-backend.onrender.com/getinvoicepage",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: GET_INVOICE_PAGE,
      payload: GetInvoicepageData.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_INVOICE_PAGE,
      payload: { data: error.response.data },
    });
  }
};
export const GetinvoiceEditDataAction =
  (AccessToken, Invoice_id) => async (dispatch) => {
    const token = AccessToken;
    try {
      const GetInvoicepageData = await axios.get(
        `https://inventory-management-backend.onrender.com/invoicelistbyid/${Invoice_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: GET_INVOICE_EDIT_DATA,
        payload: GetInvoicepageData.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_INVOICE_PAGE,
        payload: { data: error.response.data },
      });
    }
  };
export const AddInvoiceData = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;

  try {
    const AddInvoiceData = await axios.post(
      "https://inventory-management-backend.onrender.com/addinvoice",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: ADD_INVOICE,
      payload: AddInvoiceData.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADD_INVOICE,
      payload: { data: error.response.data },
    });
  }
};
export const GetDeletedInvoiceList =
  (AccessToken, data) => async (dispatch) => {
    const token = AccessToken;

    try {
      const GetDeletedInvoiceData = await axios.get(
        "https://inventory-management-backend.onrender.com/invoiceDeletelist",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            searchKeyword: data.search,
            limit: data.limit,
            page: data.pageNumber,
            orderByString: data.orderByString,
          },
        }
      );
      dispatch({
        type: GET_DELETED_INVOICE,
        payload: GetDeletedInvoiceData.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_DELETED_INVOICE,
        payload: { data: error.response.data },
      });
    }
  };
export const DeleteInvoice = (AccessToken, invoice_id) => async (dispatch) => {
  console.log("invoice_id", invoice_id, "accesstoken", AccessToken);
  const token = AccessToken;

  try {
    const DeleteInvoice = await axios.delete(
      `https://inventory-management-backend.onrender.com/DeleteInvoice/${invoice_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: DELETE_INVOICE,
      payload: DeleteInvoice.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_DELETED_INVOICE,
      payload: { data: error.response.data },
    });
  }
};
export const PermanentDeleteInvoice =
  (AccessToken, invoice_id) => async (dispatch) => {
    console.log("invoice_id", invoice_id, "accesstoken", AccessToken);
    const token = AccessToken;

    try {
      const PermanentDeleteInvoice = await axios.delete(
        `https://inventory-management-backend.onrender.com/PermanentDeleteInvoice/${invoice_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: PARMANENT_DELETE_INVOICE,
        payload: PermanentDeleteInvoice.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_PERMANENT_DELETE_INVOICE,
        payload: { data: error.response.data },
      });
    }
  };
