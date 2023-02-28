import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductValidate,
  CustomerValidate,
  TaxValidate,
  CompanyValidate,
  UserValidate,
} from "./formValidation";
// import {
//   ProductAddAction,
//   ProductEditDataAction,
// } from "../../Store/Action/ProductAction";
import {
  CustomerEditDataAction,
  CustomerAddAction,
} from "../../Store/Action/CustomerAction/index";
import { CompanyInfoEditAction } from "../../Store/Action/CompanyAction/index";
import { UserAddAction } from "../../Store/Action/UserAction/index";
import { TaxAddAction, TaxInfoEditAction } from "../../Store/Action/TaxAction";

const UseForm = (defaultData, showToastMessage, image) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [findErrors, setFindErrors] = useState(null);
  const [values, setvalues] = useState(null);
  console.log("valueserrors", errors, "findErrors", findErrors);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  console.log("Product_data ", defaultData);

  useEffect(() => {
    if (defaultData.length || Object.keys(defaultData).length) {
      setvalues(defaultData);
    }
  }, [defaultData]);

  const [test, setTest] = useState(null);
  const producthandleSubmit = () => {
    setTest(true);
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
    console.log("errors length", formAddUserData);
    if (Object.keys(errors).length) {
      setFindErrors(null);
      setTest(false);
      console.log("errors length 2", errors);
      if (defaultData?.product_id) {
        // dispatch(
        //   ProductEditDataAction(
        //     successLoginData?.LoginData?.accessToken ||
        //       accessToken?.accessToken,
        //     formAddUserData,
        //     parseInt(defaultData.product_id)
        //   )
        // );
        // alert("done");
        // showToastMessage();
      } else {
        alert("Product Add");

        // dispatch(
        //   ProductAddAction(
        //     successLoginData?.LoginData?.accessToken ||
        //       accessToken?.accessToken,
        //     formAddUserData
        //   )
        // );
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
      "terms_condition",
      values?.fax_no || defaultData?.fax_no
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
    data["tin_no"] = values?.tin_no || defaultData?.tin_no;
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
  const UserhandleSubmit = () => {
    console.log(" defaultData", defaultData);
    setFindErrors("UserValidate");
    setErrors(UserValidate(values, defaultData));
    const formAddUserData = new FormData();
    formAddUserData.append("name", values?.name);
    formAddUserData.append("role_id", values?.role_id);
    formAddUserData.append("address", values?.address);
    formAddUserData.append("email", values?.email);
    formAddUserData.append("password", values?.password);
    formAddUserData.append("mobile_no", values?.mobile_no);
    formAddUserData.append("company_id", values?.company_id);
    formAddUserData.append("image_src", image);

    if (!Object.keys(errors).length && findErrors) {
      if (defaultData.length > 0) {
        console.log("edit tax");
        dispatch(
          UserAddAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            formAddUserData,
            defaultData[0]?.tax_id
          )
        );
      } else {
        dispatch(
          UserAddAction(
            successLoginData?.LoginData?.accessToken ||
              accessToken?.accessToken,
            formAddUserData
          )
        );
      }
    }
  };
  useEffect(() => {
    if (findErrors === "ProductValidate") {
      setErrors(ProductValidate(values));
    }
    if (findErrors === "CustomerValidate") {
      setErrors(CustomerValidate(values, defaultData));
    }
    if (findErrors === "TaxValidate") {
      setErrors(TaxValidate(values, defaultData));
    }
    if (Object.keys(errors).length) {
      setFindErrors("ProductValidate");
      setTest(null);
    }
    if (!Object.keys(errors).length && findErrors === "ProductValidate") {
      if (defaultData?.product_id) {
        // dispatch(
        //   ProductEditDataAction(
        //     successLoginData?.LoginData?.accessToken ||
        //       accessToken?.accessToken,
        //     formAddUserData,
        //     parseInt(defaultData.product_id)
        //   )
        // );
        if (test) {
          alert("Product Edit in useEffect");
        }
        alert("Product Edit");
        showToastMessage();
        setFindErrors(false);
      } else {
        // dispatch(
        //   ProductAddAction(
        //     successLoginData?.LoginData?.accessToken ||
        //       accessToken?.accessToken,
        //     formAddUserData
        //   )
        // );

        showToastMessage();
        setFindErrors(false);
        if (test) {
          alert("Product ADD in useEffect");
        }
      }
    }
  }, [defaultData, errors, findErrors, showToastMessage, test, values]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      setFindErrors("UserValidate");
      setTest(null);
    }
    if (!Object.keys(errors).length && findErrors === "UserValidate") {
      if (defaultData?.product_id) {
        // dispatch(
        //   ProductEditDataAction(
        //     successLoginData?.LoginData?.accessToken ||
        //       accessToken?.accessToken,
        //     formAddUserData,
        //     parseInt(defaultData.product_id)
        //   )
        // );
        if (test) {
          alert("Product Edit in useEffect");
        }
        alert("Product Edit");
        showToastMessage();
        setFindErrors(false);
      } else {
        // dispatch(
        //   ProductAddAction(
        //     successLoginData?.LoginData?.accessToken ||
        //       accessToken?.accessToken,
        //     formAddUserData
        //   )
        // );

        showToastMessage();
        setFindErrors(false);
        if (test) {
          alert("Product ADD in useEffect");
        }
      }
    }
  }, [defaultData, errors, findErrors, showToastMessage, test, values]);

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
    UserhandleSubmit,
  };
};
export default UseForm;
