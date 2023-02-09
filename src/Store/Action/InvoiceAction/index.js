import { INVOICE_LIST, FAILED_ADMIN_LIST } from "../../ActionTypes/index";
import axios from "axios";

export const InvoiceListAction = (AccessToken) => async (dispatch) => {
  const token = AccessToken;
  try {
    const InvoiceList = await axios.get("http://localhost:3200/invoicelist", {
      headers: { Authorization: `Bearer ${token}` },
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
