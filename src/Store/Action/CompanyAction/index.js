import {
  COMPANY_INFO,
  COMPANY_INFO_EDIT,
  FAILED_ADMIN_LIST,
  COMPANY_INFO_BY_ID,
  COMPANY_DELETE,
  DELETE_COMPANY_INFO,
  ADD_COMPANY_INFO,
  PERMANENT_COMPANY_DELETE,
  FAILED_COMPANY_INFO_EDIT,
} from "../../ActionTypes/index";
import axios from "axios";

export const CompanyInfoAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const CompanyInfo = await axios.get(
      "https://inventory-management-backend.onrender.com/company_info",
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
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
export const DeleteCompanyInfoAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const DeleteCompanyInfo = await axios.get(
      "https://inventory-management-backend.onrender.com/delete/company_info",
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
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
      type: DELETE_COMPANY_INFO,
      payload: DeleteCompanyInfo.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const CompanyInfoByIdAction = (company_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const CompanyInfo = await axios.get(
      `https://inventory-management-backend.onrender.com/company_info/${company_id}`,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
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
export const AddCompanyInfoAction = (data) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const CompanyInfo = await axios.post(
      `https://inventory-management-backend.onrender.com/add/company_info`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: ADD_COMPANY_INFO,
      payload: CompanyInfo.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
// export const CompanyInfoEditAction =
//   (AccessToken, data, company_id) => async (dispatch) => {
//     const token = AccessToken;
//     console.log("CompanyInfoEditAction", data);
//     try {
//       const CompanyInfo = await axios.put(
//         `https://inventory-management-backend.onrender.com/edit/company_info/${company_id}`,
//         data,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       dispatch({
//         type: COMPANY_INFO_EDIT,
//         payload: CompanyInfo.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: FAILED_COMPANY_INFO_EDIT,
//         payload: { data: error.response.data },
//       });
//     }
//   };

export const CompanyInfoEditAction = (data, company_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  try {
    const CompanyInfo = await axios.put(
      `https://inventory-management-backend.onrender.com/edit/company_info/${company_id}`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken?.accessToken}` },
      }
    );
    dispatch({
      type: COMPANY_INFO_EDIT,
      payload: CompanyInfo.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_COMPANY_INFO_EDIT,
      payload: { data: error.response.data },
    });
  }
};

export const CompanyDeleteAction = (company_id) => async (dispatch) => {
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  try {
    const CompanyDelete = await axios.delete(
      `https://inventory-management-backend.onrender.com/delete/company_info/${company_id}`,
      { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
    );
    dispatch({
      type: COMPANY_DELETE,
      payload: CompanyDelete.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};

export const PermanentCompanyDeleteAction =
  (company_id) => async (dispatch) => {
    const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
    try {
      const CompanyDelete = await axios.delete(
        `https://inventory-management-backend.onrender.com/permanent/delete/company_info/${company_id}`,
        { headers: { Authorization: `Bearer ${accessToken?.accessToken}` } }
      );
      dispatch({
        type: PERMANENT_COMPANY_DELETE,
        payload: CompanyDelete.data,
      });
    } catch (error) {
      dispatch({
        type: FAILED_ADMIN_LIST,
        payload: { data: error.response.data },
      });
    }
  };
