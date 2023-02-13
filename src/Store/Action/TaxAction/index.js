import {
  TAX_LIST,
  TAX_EDIT,
  TAX_DELETED_LIST,
  FAILED_ADMIN_LIST,
} from "../../ActionTypes/index";
import axios from "axios";

export const TaxListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const TaxList = await axios.get("http://localhost:3200/tax", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        searchKeyword: data.search ? data.search : null,
        limit: data.limit,
        page: data.pageNumber,
      },
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

export const TaxDelectListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const TaxDelectList = await axios.get("http://localhost:3200/delete/tax", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        searchKeyword: data.search ? data.search : null,
        limit: data.limit,
        page: data.pageNumber,
      },
    });
    dispatch({
      type: TAX_DELETED_LIST,
      payload: TaxDelectList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
