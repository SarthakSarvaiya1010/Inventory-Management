import {
  CUSTOMER_LIST,
  FAILED_ADMIN_LIST,
  CUSTOMER_EDIT,
  CUSTOMER_DELETED_LIST,
} from "../../ActionTypes/index";
import axios from "axios";

export const CustomerListAction = (AccessToken) => async (dispatch) => {
  const token = AccessToken;
  try {
    const ProductList = await axios.get("http://localhost:3200/customers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CUSTOMER_LIST,
      payload: ProductList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const CustomerDelectListAction = (AccessToken) => async (dispatch) => {
  const token = AccessToken;
  try {
    const CustomerDelectList = await axios.get(
      "http://localhost:3200/delete/customers",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: CUSTOMER_DELETED_LIST,
      payload: CustomerDelectList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
export const CustomerEditAction = (AccessToken) => async (dispatch) => {
  const token = AccessToken;
  try {
    const ProductEdit = await axios.get("http://localhost:3200/customers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CUSTOMER_EDIT,
      payload: ProductEdit.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
