import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductValidate, CustomerValidate } from "./formValidation";
import {
  ProductAddAction,
  ProductEditDataAction,
} from "../../Store/Action/ProductAction";
import {
  CustomerEditDataAction,
  CustomerAddAction,
} from "../../Store/Action/CustomerAction/index";

const UseForm = (defaultData, showToastMessage, image) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [findErrors, setFindErrors] = useState(null);
  const [values, setvalues] = useState(null);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  console.log("Product_data ", defaultData);

  const producthandleSubmit = () => {
    setFindErrors(true);
    setErrors(ProductValidate(values, defaultData));
    const data = {};
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
    data["product_name"] = values?.product_name || defaultData?.product_name;
    data["product_type"] = values?.product_type || defaultData?.product_type;
    data["description"] = values?.Description || defaultData?.description;
    data["hsn"] = parseFloat(values?.hsn || defaultData?.hsn);
    data["weight"] = parseFloat(values.weight || defaultData?.weight);
    data["image_src"] = image;
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

  useEffect(() => {
    if (findErrors) {
      setErrors(ProductValidate(values, defaultData));
      setErrors(CustomerValidate(values, defaultData));
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
    values,
    setvalues,
    errors,
    handleOnchange,
  };
};
export default UseForm;
