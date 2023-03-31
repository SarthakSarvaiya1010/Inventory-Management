import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  ProductValidate,
  CustomerValidate,
  TaxValidate,
  CompanyValidate,
  UserValidate,
} from "./formValidation";
import {
  ProductAddAction,
  ProductEditDataAction,
} from "../../Redux/ProductRedux/ProductThunk";
import {
  CustomerEditDataAction,
  CustomerAddAction,
} from "../../Redux/CustomerRedux/CustomerThunk";
import {
  CompanyInfoEditAction,
  AddCompanyInfoAction,
} from "../../Redux/CompanyRedux/CompanyThunk";
import { UserAddAction, UserEditAction } from "../../Redux/UserReduk/UserThunk";
import { TaxAddAction, TaxInfoEditAction } from "../../Redux/TaxRedux/TaxThunk";

const useForm = (defaultData, image) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [findErrors, setFindErrors] = useState(null);
  const [values, setvalues] = useState(null);
  useEffect(() => {
    if (
      defaultData?.length || defaultData
        ? Object?.keys(defaultData)?.length
        : defaultData?.length
    ) {
      setvalues(defaultData);
    }
  }, [defaultData]);

  const producthandleSubmit = () => {
    setFindErrors("ProductError");
    setErrors(ProductValidate(values, defaultData));
    const formAddUserData = new FormData();
    formAddUserData.append("product_name", values?.product_name);
    formAddUserData.append("product_type", values?.product_type);
    formAddUserData.append("description", values?.description);
    formAddUserData.append("hsn", values?.hsn);
    formAddUserData.append("unit", values?.unit);
    formAddUserData.append("weight", values?.weight);
    formAddUserData.append("image_src", image ? image : null);
    if (Object.keys(errors).length === 0) {
      if (defaultData?.product_id) {
        dispatch(ProductEditDataAction(formAddUserData));
        localStorage.setItem("product_id", parseInt(defaultData.product_id));
      } else {
        dispatch(ProductAddAction(formAddUserData));
      }
    }
  };

  const companyhandleSubmit = () => {
    setFindErrors("CompanyError");
    setErrors(CompanyValidate(values));
    const formAddUserData = new FormData();
    formAddUserData.append("company_address", values?.company_address);
    formAddUserData.append("company_name", values?.company_name);
    formAddUserData.append("image_src", image);
    formAddUserData.append("mobile_no", values?.mobile_no);
    formAddUserData.append("phone_no", values?.phone_no);
    formAddUserData.append("terms_condition", values?.terms_condition);
    formAddUserData.append("fax_no", values?.fax_no);
    formAddUserData.append("tin_gst_no", values?.tin_gst_no);
    formAddUserData.append("website", values?.website);

    if (Object.keys(errors).length === 0) {
      if (defaultData?.length) {
        dispatch(CompanyInfoEditAction(formAddUserData));
        localStorage.setItem("company_id", parseInt(defaultData?.company_id));
      } else {
        dispatch(
          AddCompanyInfoAction(
            formAddUserData,
            parseInt(defaultData?.company_id)
          )
        );
      }
    }
  };

  const customerhandleSubmit = () => {
    setFindErrors("CustomerError");
    setErrors(CustomerValidate(values, defaultData));
    const data = {};
    data["customer_name"] = values?.customer_name;
    data["mobile_no"] = values?.mobile_no;
    data["email"] = values?.email;
    data["address"] = values?.address;
    data["tin_no"] = values.tin_no;
    if (Object.keys(errors).length === 0) {
      if (defaultData?.customer_id) {
        dispatch(CustomerEditDataAction(data));
        localStorage.getItem("customer_id", parseInt(defaultData?.customer_id));
      } else {
        dispatch(CustomerAddAction(data));
      }
    }
  };

  const TaxhandleSubmit = () => {
    setFindErrors("TaxError");
    setErrors(TaxValidate(values, defaultData));
    const data = {};
    data["tax_name"] = values?.tax_name;
    data["tax_rate"] = parseFloat(values?.tax_rate);
    data["tax_country"] = values?.tax_country;
    data["isactive"] = values?.isactive
      ? values?.isactive
      : defaultData?.isactive || "NO";
    if (Object.keys(errors).length === 0) {
      if (defaultData?.tax_id) {
        dispatch(TaxInfoEditAction(data));
        localStorage.setItem("Tax_id", defaultData?.tax_id);
      } else {
        dispatch(TaxAddAction(data));
      }
    }
  };
  const UserhandleSubmit = () => {
    setFindErrors("UserValidate");
    setErrors(UserValidate(values, defaultData));
    const formAddUserData = new FormData();
    formAddUserData.append("name", values?.name);
    formAddUserData.append("role_id", parseInt(values?.role_id));
    formAddUserData.append("address", values?.address);
    formAddUserData.append("email", values?.email);
    formAddUserData.append("password", values?.password);
    formAddUserData.append("mobile_no", values?.mobile_no);
    formAddUserData.append("company_id", parseInt(values?.company_id));
    formAddUserData.append("image_src", image);

    if (Object.keys(errors).length === 0) {
      if (Object.keys(defaultData).length > 0) {
        localStorage.setItem("user_uuid", defaultData?.user_uuid);
        dispatch(UserEditAction(formAddUserData, defaultData));
      } else {
        dispatch(UserAddAction(formAddUserData));
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
    if (findErrors === "CompanyError") {
      setErrors(CompanyValidate(values));
    }
    if (findErrors === "UserValidate") {
      setErrors(UserValidate(values, defaultData));
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

  return {
    producthandleSubmit,
    customerhandleSubmit,
    TaxhandleSubmit,
    values,
    setvalues,
    errors,
    handleOnchange,
    companyhandleSubmit,
    UserhandleSubmit,
  };
};
export default useForm;
