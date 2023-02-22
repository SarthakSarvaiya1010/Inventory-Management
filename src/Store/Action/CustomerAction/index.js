import {
  CUSTOMER_LIST,
  FAILED_ADMIN_LIST,
  CUSTOMER_EDIT,
  CUSTOMER_DELETED_LIST,
  CUSTOMER_DELETE,
  CUSTOMER_EDIT_DATA,
  CUSTOMER_ADD,
  PERMANENT_CUSTOMER_DELETE,
  FAILED_PERMANENT_CUSTOMER_DELETE,
} from "../../ActionTypes/index";
import axios from "axios";

export const CustomerListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const ProductList = await axios.get(
      "https://inventory-management-backend.onrender.com/customers",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: data
          ? {
              searchKeyword: data.search ? data.search : null,
              limit: data.limit,
              page: data.pageNumber,
              orderByString: data.orderByString,
            }
          : null,
      }
    );
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

export const CustomerAddAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const CustomerAdd = await axios.post(
      "https://inventory-management-backend.onrender.com/customers",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: CUSTOMER_ADD,
      payload: CustomerAdd.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const CustomerDelectListAction =
  (AccessToken, data) => async (dispatch) => {
    const token = AccessToken;
    try {
      const CustomerDelectList = await axios.get(
        "https://inventory-management-backend.onrender.com/delete/customers",
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

export const CustomerEditAction =
  (AccessToken, customers_id) => async (dispatch) => {
    const token = AccessToken;
    try {
      const ProductEdit = await axios.get(
        `https://inventory-management-backend.onrender.com/customers/${customers_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

export const CustomerEditDataAction =
  (AccessToken, data, customers_id) => async (dispatch) => {
    const token = AccessToken;
    try {
      const ProductEditData = await axios.put(
        `https://inventory-management-backend.onrender.com/edit/customers/${customers_id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: CUSTOMER_EDIT_DATA,
        payload: ProductEditData.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };

export const CustomerDeleteAction =
  (AccessToken, customer_id) => async (dispatch) => {
    const token = AccessToken;
    try {
      const CustomerDelete = await axios.delete(
        `https://inventory-management-backend.onrender.com/delete/customers/${customer_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: CUSTOMER_DELETE,
        payload: CustomerDelete.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };
export const PermanentCustomerDeleteAction =
  (AccessToken, customer_id) => async (dispatch) => {
    const token = AccessToken;
    try {
      const PermanentCustomerDelete = await axios.delete(
        `https://inventory-management-backend.onrender.com/permanent/delete/customers/${customer_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: PERMANENT_CUSTOMER_DELETE,
        payload: PermanentCustomerDelete.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_PERMANENT_CUSTOMER_DELETE,
        payload: { data: error.response.data },
      });
    }
  };
