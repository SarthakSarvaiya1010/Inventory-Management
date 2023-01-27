import { AUTH, AUTHFAILED } from "../../ActionTypes/index";
import axios from "axios";

export const userLogin = (data) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:3200/login ", data);

    dispatch({
      type: AUTH,

      payload: { data: res.data },
    });
  } catch (error) {
    dispatch({
      type: AUTHFAILED,
      payload: { data: error.response.data },
    });
  }
};
