import React, { useEffect } from "react";
import AddInvoice from "../Components/Invoice/AddInvoice/AddInvoice";
import { useSelector } from "react-redux";

function AddInvoicePage() {
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  console.log("this is reducerdata", InvoicePageData);
  useEffect(() => {
    if (InvoicePageData?.GetInvoicePagData.length) {
      localStorage.setItem(
        "InvoiceAddPageData",
        JSON.stringify(InvoicePageData?.GetInvoicePagData)
      );
    }
  }, [InvoicePageData?.GetInvoicePagData]);

  const invoivepagedata = JSON.parse(
    localStorage.getItem("InvoiceAddPageData")
  );
  const test = InvoicePageData?.GetInvoicePagData.length
    ? InvoicePageData?.GetInvoicePagData
    : invoivepagedata;
  console.log("test", test);
  return (
    <div>
      {test ? (
        <AddInvoice
          successLoginData={successLoginData}
          accessToken={accessToken}
          testData={test}
        />
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default AddInvoicePage;
