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

const useForm = (defaultData, image) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const [findErrors, setFindErrors] = useState(null);
  const [values, setvalues] = useState(null);
  console.log("values==>", values);
  console.log("errors======>", errors);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  console.log("findError", findErrors, "errors", errors);
  useEffect(() => {
    if (defaultData?.length && Object.keys(defaultData).length) {
      setvalues(defaultData);
    }
  }, [defaultData]);
  const producthandleSubmit = () => {
    setFindErrors("ProductError");
    setErrors(ProductValidate(values, defaultData));
    const data = {};
    const formAddUserData = new FormData();
    setFindErrors("ProductValidate");
    setErrors(ProductValidate(values, defaultData));
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
    data["product_type"] = values?.product_type
      ? values?.product_type
      : "Tax" || defaultData?.product_type;
    data["description"] = values?.Description || defaultData?.description;
    data["hsn"] = parseFloat(parseInt(values?.hsn) || defaultData?.hsn);
    data["weight"] = parseFloat(
      parseFloat(values.weight) || defaultData?.weight
    );
    data["image_src"] = image;
    if (
      !errors?.product_name &&
      !errors?.product_type &&
      !errors?.hsn &&
      !errors?.weight
    ) {
      console.log("correct");
      if (defaultData?.product_id) {
        console.log("done======>");
        alert("done");
        dispatch(
          ProductEditDataAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            formAddUserData,
            parseInt(defaultData.product_id)
          )
        );
      } else {
        alert("product Add");
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
    setErrors(CompanyValidate(values));
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

    if (!Object.keys(errors).length) {
      dispatch(
        CompanyInfoEditAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          formAddUserData,
          parseInt(defaultData?.company_id)
        )
      );
    }
  };

  const customerhandleSubmit = () => {
    setFindErrors("CustomerError");
    setErrors(CustomerValidate(values, defaultData));
    const data = {};
    data["customer_name"] = values?.customer_name || defaultData?.customer_name;
    data["mobile_no"] = values?.mobile_no || defaultData?.mobile_no;
    data["email"] = values?.email || defaultData?.email;
    data["address"] = values?.address || defaultData?.address;
    data["tin_no"] = values.tin_no || defaultData?.tin_no;
    if (!errors?.customer_name && !errors?.mobile_no && !errors.address) {
      if (defaultData?.customer_id) {
        dispatch(
          CustomerEditDataAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            data,
            parseInt(defaultData?.customer_id)
          )
        );
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
    setFindErrors("TaxError");
    setErrors(TaxValidate(values, defaultData));
    const data = {};
    data["tax_name"] = values?.tax_name || defaultData?.tax_name;
    data["tax_rate"] = parseFloat(values?.tax_rate) || defaultData?.tax_rate;
    data["tax_country"] = values?.tax_country || defaultData?.tax_country;
    data["isactive"] = values?.isactive
      ? values?.isactive
      : "NO" || defaultData?.isactive;
    console.log("data", data);
    if (!errors?.tax_name && !errors?.tax_rate && !errors?.tax_country) {
      if (defaultData?.tax_id) {
        dispatch(
          TaxInfoEditAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            data,
            defaultData?.tax_id
          )
        );
      } else {
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
    if (findErrors === "ProductError") {
      setErrors(ProductValidate(values, defaultData));
    }
    if (findErrors === "CustomerError") {
      setErrors(CustomerValidate(values, defaultData));
    }
    if (findErrors === "TaxError") {
      setErrors(TaxValidate(values, defaultData));
    }
    // if (Object.keys(errors).length && findErrors) {
    //   alert("done");
    //   setFindErrors(false);
    // }
  }, [defaultData, findErrors, values]);

  const handleOnchange = useCallback(
    (e) =>
      setvalues((values) => {
        console.log("values===========>", values);
        const newValues = { ...values, [e.target.name]: e.target.value };
        console.log("newValues===>", newValues);
        setErrors(ProductValidate(newValues));
        // setErrors(CustomerValidate(newValues));
        // setErrors(TaxValidate(newValues));
        return newValues;
      }),
    []
  );

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
export default useForm;
