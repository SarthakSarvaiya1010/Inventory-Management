import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "./formValidation";
import {
  ProductAddAction,
  ProductEditDataAction,
} from "../../Store/Action/ProductAction";

const UseForm = (Product_data, showToastMessage) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [findErrors, setFindErrors] = useState(null);
  const [values, setvalues] = useState(null);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);

  // console.log("values----->", values);

  console.log(
    // "errors",
    // errors,
    // "Product_data",
    // Product_data,
    "values",
    values,
    Product_data?.product_name
    // Product_data?.product_name
  );
  const handleSubmit = () => {
    setFindErrors(true);
    setErrors(validate(values, Product_data));
    const data = {};
    data["product_name"] = values?.product_name || Product_data?.product_name;
    data["product_type"] = values?.product_type || Product_data?.product_type;
    data["description"] = values?.Description || Product_data?.description;
    data["hsn"] = parseFloat(values?.hsn || Product_data?.hsn);
    data["weight"] = parseFloat(values.weight || Product_data?.weight);
    if (!Object.keys(errors).length && findErrors) {
      if (Product_data) {
        dispatch(
          ProductEditDataAction(
            successLoginData?.LoginData?.accessToken,
            data,
            parseInt(Product_data.product_id)
          )
        );
        showToastMessage();
      } else {
        dispatch(
          ProductAddAction(successLoginData?.LoginData?.accessToken, data)
        );
      }
    }
  };

  useEffect(() => {
    if (findErrors) {
      setErrors(validate(values, Product_data));
    }
  }, [Product_data, findErrors, values]);

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
    handleSubmit,
    values,
    setvalues,
    errors,
    handleOnchange,
  };
};
export default UseForm;
