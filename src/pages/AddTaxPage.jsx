import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AddTax from "../Components/Tax/AddTax/AddTax";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTaxPage() {
  const TaxData = useSelector((state) => state?.TaxData);
  console.log("TaxData=======>", TaxData);
  const showToastMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  useEffect(() => {
    if (TaxData?.TaxAddSuccessData?.statusCode === "200") {
      showToastMessage(TaxData?.TaxAddSuccessData?.message);
    }
  }, [
    TaxData?.TaxAddSuccessData?.message,
    TaxData?.TaxAddSuccessData?.statusCode,
  ]);
  useEffect(() => {
    if (TaxData?.TaxEditSucessData?.statusCode === "200") {
      showToastMessage(TaxData?.TaxEditSucessData?.message);
    }
  }, [
    TaxData?.TaxEditSucessData?.message,
    TaxData?.TaxEditSucessData?.statusCode,
  ]);
  return (
    <div>
      {" "}
      <ToastContainer />
      <AddTax />
    </div>
  );
}

export default AddTaxPage;
