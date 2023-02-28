import React, { useEffect } from "react";
import DeleteTaxList from "../Components/Tax/DeleteTax/DeleteTaxList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function DeleteTaxPage() {
  const TaxData = useSelector((state) => state?.TaxData);
  console.log("taxdaata=======>", TaxData?.PermanentTaxDeleteData);
  const showToastMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  useEffect(() => {
    if (TaxData?.PermanentTaxDeleteData?.statusCode == "200") {
      showToastMessage(TaxData?.PermanentTaxDeleteData?.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [TaxData?.PermanentTaxDeleteData?.statusCode]);
  return (
    <div>
      <ToastContainer />
      <DeleteTaxList />
    </div>
  );
}

export default DeleteTaxPage;
