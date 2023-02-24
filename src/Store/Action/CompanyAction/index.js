import {
  COMPANY_INFO,
  COMPANY_INFO_EDIT,
  FAILED_ADMIN_LIST,
  COMPANY_INFO_BY_ID,
  COMPANY_DELETE,
} from "../../ActionTypes/index";
import axios from "axios";

export const CompanyInfoAction = (AccessToken, data) => async (dispatch) => {
  const token = AccessToken;
  try {
    const CompanyInfo = await axios.get("http://localhost:3200/company_info", {
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
export const CompanyInfoByIdAction =
  (AccessToken, company_id) => async (dispatch) => {
    const token = AccessToken;
    try {
      const CompanyInfo = await axios.get(
        `http://localhost:3200/company_info/${company_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: COMPANY_INFO_BY_ID,
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

export const CompanyDeleteAction =
  (AccessToken, Product_id) => async (dispatch) => {
    // const Product_id = 6;
    const token = AccessToken;
    console.log("Product_id", Product_id);
    try {
      const ProductDelete = await axios.delete(
        `http://localhost:3200/delete/company_info/${Product_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({
        type: COMPANY_DELETE,
        payload: ProductDelete.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };
