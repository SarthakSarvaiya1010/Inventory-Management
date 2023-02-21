import React, { useEffect } from "react";
import TaxList from "../Components/Tax/TaxList/TaxList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function TaxListPage() {
  const TaxData = useSelector((state) => state?.TaxData);
  const showToastMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  useEffect(() => {
    if (TaxData?.TaxDeleteSuccessData?.statusCode == "200") {
      showToastMessage(TaxData?.TaxDeleteSuccessData?.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [TaxData?.TaxDeleteSuccessData?.statusCode]);
  return (
    <div>
      <ToastContainer />
      <TaxList />
    </div>
  );
}

export default TaxListPage;
