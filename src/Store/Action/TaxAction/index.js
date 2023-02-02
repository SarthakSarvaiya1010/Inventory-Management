import { TAX_LIST, TAX_EDIT, FAILED_ADMIN_LIST } from "../../ActionTypes/index";
import axios from "axios";

export const TaxListAction = (AccessToken) => async (dispatch) => {
  const token = AccessToken;
  try {
    const TaxList = await axios.get("http://localhost:3200/tax", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: TAX_LIST,
      payload: TaxList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const TaxEditAction = (AccessToken, Tax_id) => async (dispatch) => {
  // const Product_id = 6;
  const token = AccessToken;
  try {
    const TaxEdit = await axios.get(`http://localhost:3200/tax/${Tax_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: TAX_EDIT,
      payload: TaxEdit.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};