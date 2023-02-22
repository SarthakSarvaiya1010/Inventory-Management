import {
  TAX_LIST,
  TAX_ADD,
  FAILED_TAX_ADD,
  TAX_EDIT,
  TAX_DELETED_LIST,
  FAILED_ADMIN_LIST,
  TAX_DELETE,
  FAILED_TAX_DELETE,
  TAX_INFO_EDIT,
  FAILED_TAX_INFO_EDIT,
  PERMANENT_TAX_DELETE,
  FAILED_PERMANENT_TAX_DELETE,
} from "../../ActionTypes/index";
import axios from "axios";

export const TaxListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const TaxList = await axios.get(
      "https://inventory-management-backend.onrender.com/tax",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          searchKeyword: data.search ? data.search : null,
          limit: data.limit,
          page: data.pageNumber,
          orderByString: data.orderByString,
        },
      }
    );
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
    const TaxEdit = await axios.get(
      `https://inventory-management-backend.onrender.com/tax/${Tax_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
    const TaxDelectList = await axios.get(
      "https://inventory-management-backend.onrender.com/delete/tax",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          searchKeyword: data.search ? data.search : null,
          limit: data.limit,
          page: data.pageNumber,
        },
      }
    );
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

export const TaxDeleteAction = (AccessToken, Tax_id) => async (dispatch) => {
  const token = AccessToken;
  console.log("tax_id", Tax_id);
  try {
    const TaxDelete = await axios.delete(
      `https://inventory-management-backend.onrender.com/delete/tax/${Tax_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: TAX_DELETE,
      payload: TaxDelete.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_TAX_DELETE,
      payload: { data: error.response.data },
    });
  }
};
export const TaxAddAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  console.log("data", data);
  try {
    const TaxAdd = await axios.post(
      "https://inventory-management-backend.onrender.com/add/tax",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: TAX_ADD,
      payload: TaxAdd.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_TAX_ADD,
      payload: { data: error.response.data },
    });
  }
};
export const TaxInfoEditAction =
  (AccessToken, data, Tax_id) => async (dispatch) => {
    const token = AccessToken;
    console.log("data", data);
    try {
      const TaxInfoEdit = await axios.put(
        `https://inventory-management-backend.onrender.com/edit/tax/${Tax_id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: TAX_INFO_EDIT,
        payload: TaxInfoEdit.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_TAX_INFO_EDIT,
        payload: { data: error.response.data },
      });
    }
  };
export const PermanentTaxDeleteAction =
  (AccessToken, Tax_id) => async (dispatch) => {
    const token = AccessToken;
    console.log("tax_id", Tax_id);
    try {
      const PermanentTaxDelete = await axios.delete(
        `https://inventory-management-backend.onrender.com/permanent/delete/tax/${Tax_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: PERMANENT_TAX_DELETE,
        payload: PermanentTaxDelete.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_PERMANENT_TAX_DELETE,
        payload: { data: error.response.data },
      });
    }
  };
