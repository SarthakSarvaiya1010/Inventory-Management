import {
  PRODUCT_LIST,
  FAILED_ADMIN_LIST,
  PRODUCT_EDIT,
  PRODUCT_ADD,
  PRODUCT_DELETE,
  PRODUCT_EDIT_DATA,
  PRODUCT_DELETE_LIST,
  PERMANENT_PRODUCT_DELETE,
  FAILED_PERMANENT_PRODUCT_DELTETE,
  LIST_LOADER,
} from "../../ActionTypes/index";
import axios from "axios";

export const ProductListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  console.log(data, " data");
  try {
    dispatch({
      type: LIST_LOADER,
      payload: [],
    });
    await axios
      .get("http://localhost:3200/products", {
        headers: { Authorization: `Bearer ${token}` },
        params: data
          ? {
              searchKeyword: data.search,
              limit: data.limit,
              page: data.pageNumber,
              orderByString: data.orderByString,
            }
          : null,
      })
      .then((res) => {
        dispatch({
          type: PRODUCT_LIST,
          payload: res.data,
        });
      });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const ProductEditAction =
  (AccessToken, Product_id) => async (dispatch) => {
    // const Product_id = 6;
    const token = AccessToken;
    try {
      const ProductEdit = await axios.get(
        `http://localhost:3200/products/${Product_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: PRODUCT_EDIT,
        payload: ProductEdit.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };

export const ProductEditDataAction =
  (AccessToken, data, Product_id) => async (dispatch) => {
    console.log("data====>",data);
    // const Product_id = 6;
    const token = AccessToken;
    console.log(token, Product_id, data, "token, Product_id");
    try {
      const ProductEditData = await axios.put(
        `http://localhost:3200/edit/products/${Product_id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: PRODUCT_EDIT_DATA,
        payload: ProductEditData.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };

export const ProductAddAction = (AccessToken, data) => async (dispatch) => {
  // const Product_id = 6;
  const token = AccessToken;
  console.log("data==========>", data);
  try {
    const ProductAdd = await axios.post(
      "http://localhost:3200/products",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: PRODUCT_ADD,
      payload: ProductAdd.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const ProductDeleteAction =
  (AccessToken, Product_id) => async (dispatch) => {
    // const Product_id = 6;
    const token = AccessToken;
    console.log("Product_id", Product_id);
    try {
      const ProductDelete = await axios.delete(
        `http://localhost:3200/delete/products/${Product_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: PRODUCT_DELETE,
        payload: ProductDelete.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };
export const ProductDeleteListAction =
  (AccessToken, data) => async (dispatch) => {
    // const Product_id = 6;
    const token = AccessToken;
    try {
      const ProductDeleteList = await axios.get(
        "http://localhost:3200/delete/products",
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
        type: PRODUCT_DELETE_LIST,
        payload: ProductDeleteList.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };
export const PermanentProductDelete =
  (AccessToken, Product_id) => async (dispatch) => {
    // const Product_id = 6;
    const token = AccessToken;
    console.log(Product_id);
    try {
      const PermanentProductDelete = await axios.delete(
        `http://localhost:3200/permanent/delete/products/${Product_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: PERMANENT_PRODUCT_DELETE,
        payload: PermanentProductDelete.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_PERMANENT_PRODUCT_DELTETE,
        payload: { data: error.response.data },
      });
    }
  };
