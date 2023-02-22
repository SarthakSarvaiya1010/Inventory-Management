import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductValidate,
  CustomerValidate,
  TaxValidate,
  CompanyValidate,
} from "./formValidation";
import {
  ProductAddAction,
  ProductEditDataAction,
} from "../../Store/Action/ProductAction";
import {
  CustomerEditDataAction,
  CustomerAddAction,
} from "../../Store/Action/CustomerAction/index";
import { CompanyInfoEditAction } from "../../Store/Action/CompanyAction/index";
import { TaxAddAction, TaxInfoEditAction } from "../../Store/Action/TaxAction";

const UseForm = (defaultData, showToastMessage, image) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [findErrors, setFindErrors] = useState(null);
  const [values, setvalues] = useState(null);
  console.log("values", values);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  console.log("Product_data ", defaultData);

  const producthandleSubmit = () => {
    setFindErrors(true);
    setErrors(ProductValidate(values, defaultData));
    const formAddUserData = new FormData();
    formAddUserData.append(
      "product_name",
      values?.product_name || defaultData?.product_name
    );
    formAddUserData.append(
      "product_type",
      values?.product_type || defaultData?.product_type
    );
    formAddUserData.append(
      "description",
      values?.Description || defaultData?.description
    );
    formAddUserData.append("hsn", values?.hsn || defaultData?.hsn);
    formAddUserData.append("weight", values?.weight || defaultData?.weight);
    formAddUserData.append("image_src", image);
    if (!Object.keys(errors).length && findErrors) {
      if (defaultData?.product_id) {
        dispatch(
          ProductEditDataAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            formAddUserData,
            parseInt(defaultData.product_id)
          )
        );
        showToastMessage();
      } else {
        dispatch(
          ProductAddAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            formAddUserData
          )
        );
      }
    }
  };

  const companyhandleSubmit = () => {
    setFindErrors(true);
    setErrors(CompanyValidate(values, defaultData));
    const formAddUserData = new FormData();
    formAddUserData.append(
      "company_address",
      values?.company_address || defaultData?.company_address
    );
    formAddUserData.append(
      "company_name",
      values?.company_name || defaultData?.company_name
    );
    formAddUserData.append("image_src", image);
    formAddUserData.append(
      "mobile_no",
      values?.mobile_no || defaultData?.mobile_no
    );
    formAddUserData.append(
      "phone_no",
      values?.phone_no || defaultData?.phone_no
    );
    formAddUserData.append(
      "terms_condition",
      values?.terms_condition || defaultData?.terms_condition
    );
    formAddUserData.append(
      "tin_gst_no",
      values?.tin_gst_no || defaultData?.tin_gst_no
    );
    formAddUserData.append("website", values?.website || defaultData?.website);

    if (!Object.keys(errors).length && findErrors) {
      dispatch(
        CompanyInfoEditAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          formAddUserData,
          parseInt(defaultData?.company_id)
        )
      );
      showToastMessage();
    }
  };

  const customerhandleSubmit = () => {
    setFindErrors(true);
    setErrors(CustomerValidate(values, defaultData));
    const data = {};
    data["customer_name"] = values?.customer_name || defaultData?.customer_name;
    data["mobile_no"] = values?.mobile_no || defaultData?.mobile_no;
    data["email"] = values?.email || defaultData?.email;
    data["address"] = values?.address || defaultData?.address;
    data["tin_no"] = values.tin_no || defaultData?.tin_no;
    if (!Object.keys(errors).length && findErrors) {
      if (defaultData) {
        dispatch(
          CustomerEditDataAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            data,
            parseInt(defaultData?.customer_id)
          )
        );
        showToastMessage();
      } else {
        dispatch(
          CustomerAddAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            data
          )
        );
      }
    }
  };
  const TaxhandleSubmit = () => {
    console.log(" defaultData", defaultData);
    setFindErrors(true);
    setErrors(TaxValidate(values, defaultData));
    const data = {};
    data["tax_name"] = values?.tax_name || defaultData[0]?.tax_name;
    data["tax_rate"] = parseFloat(values?.tax_rate) || defaultData[0]?.tax_rate;
    data["tax_country"] = values?.tax_country || defaultData[0]?.tax_country;
    data["isactive"] = values?.isactive
      ? values?.isactive
      : "NO" || defaultData?.isactive;
    console.log("data", data);
    if (!Object.keys(errors).length && findErrors) {
      if (defaultData.length > 0) {
        console.log("edit tax");
        dispatch(
          TaxInfoEditAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            data,
            defaultData[0]?.tax_id
          )
        );
      } else {
        console.log("confirm dispatch", Object.keys(data).length === 4);
        dispatch(
          TaxAddAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            data
          )
        );
      }
    }
  };

  useEffect(() => {
    if (findErrors) {
      setErrors(ProductValidate(values, defaultData));
      setErrors(CustomerValidate(values, defaultData));
      setErrors(TaxValidate(values, defaultData));
    }
  }, [defaultData, findErrors, values]);

  const handleOnchange = useCallback(
    (e) =>
      setvalues((values) => {
        const newValues = { ...values, [e.target.name]: e.target.value };
        return newValues;
      }),
    []
  );

  // console.log(values, "values");

  return {
    producthandleSubmit,
    customerhandleSubmit,
    TaxhandleSubmit,
    values,
    setvalues,
    errors,
    handleOnchange,
    companyhandleSubmit,
  };
};
export default UseForm;
