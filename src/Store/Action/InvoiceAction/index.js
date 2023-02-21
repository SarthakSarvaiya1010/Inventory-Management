import {
  INVOICE_LIST,
  FAILED_ADMIN_LIST,
  GET_INVOICE_PAGE,
  FAILED_INVOICE_PAGE,
  GET_INVOICE_EDIT_DATA,
} from "../../ActionTypes/index";
import axios from "axios";

export const InvoiceListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const InvoiceList = await axios.get("http://localhost:3200/invoicelist", {
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
      "http://localhost:3200/getinvoicepage",
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
        `http://localhost:3200/invoicelistbyid/${Invoice_id}`,
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
