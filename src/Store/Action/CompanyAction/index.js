import {
  COMPANY_INFO,
  COMPANY_INFO_EDIT,
  FAILED_ADMIN_LIST,
} from "../../ActionTypes/index";
import axios from "axios";

export const CompanyInfoAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const CompanyInfo = await axios.get(
      "https://inventory-management-backend.onrender.com/company_info",
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
      type: COMPANY_INFO,
      payload: CompanyInfo.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const CompanyInfoEditAction =
  (AccessToken, data, company_id) => async (dispatch) => {
    const token = AccessToken;
    try {
      const CompanyInfo = await axios.put(
        `https://inventory-management-backend.onrender.com/edit/company_info/${company_id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: COMPANY_INFO_EDIT,
        payload: CompanyInfo.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };
