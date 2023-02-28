import {
  USER_LIST,
  USER_DELTE_LIST,
  FAILED_ADMIN_LIST,
  USER_DELETE,
  USER_GET_BY_UUID,
  USER_ADD,
} from "../../ActionTypes/index";
import axios from "axios";

export const userListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const userList = await axios.get(
      "https://inventory-management-backend.onrender.com/users",
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
      type: USER_LIST,
      payload: userList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
export const userGetByuuidAction =
  (AccessToken, user_uuid) => async (dispatch) => {
    const token = AccessToken;
    try {
      const userList = await axios.get(
        `https://inventory-management-backend.onrender.com/users/${user_uuid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: USER_GET_BY_UUID,
        payload: userList.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };
export const userDelteListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const userList = await axios.get(
      "https://inventory-management-backend.onrender.com/delete/users",
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
      type: USER_DELTE_LIST,
      payload: userList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const userDeleteAction = (AccessToken, user_id) => async (dispatch) => {
  const token = AccessToken;
  try {
    const userList = await axios.delete(
      `https://inventory-management-backend.onrender.com/delete/users/${user_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: USER_DELETE,
      payload: userList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const UserAddAction = (AccessToken, data) => async (dispatch) => {
  // const Product_id = 6;
  const token = AccessToken;
  console.log("data==========>", data);
  try {
    const UserAdd = await axios.post(
      "https://inventory-management-backend.onrender.com/users",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: USER_ADD,
      payload: UserAdd.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
