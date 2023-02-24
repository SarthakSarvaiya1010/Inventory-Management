import {
  USER_LIST,
  USER_DELTE_LIST,
  FAILED_ADMIN_LIST,
  USER_DELETE,
} from "../../ActionTypes/index";
import axios from "axios";

export const userListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const userList = await axios.get("http://localhost:3200/users", {
      headers: { Authorization: `Bearer ${token}` },
      params: data
        ? {
            searchKeyword: data.search ? data.search : null,
            limit: data.limit,
            page: data.pageNumber,
            orderByString: data.orderByString,
          }
        : null,
    });
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
export const userDelteListAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const userList = await axios.get("http://localhost:3200/delete/users", {
      headers: { Authorization: `Bearer ${token}` },
      params: data
        ? {
            searchKeyword: data.search ? data.search : null,
            limit: data.limit,
            page: data.pageNumber,
            orderByString: data.orderByString,
          }
        : null,
    });
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
      `http://localhost:3200/delete/users/${user_id}`,
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
