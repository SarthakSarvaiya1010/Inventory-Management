import React from "react";
import { useEffect } from "react";
import AddInvoice from "../Components/Invoice/AddInvoice/AddInvoice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

function AddInvoicePage() {
  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  console.log("InvoicePageData?.InvoicePdf", InvoicePageData?.InvoicePdf);
  const showToastMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  useEffect(() => {
    if (InvoicePageData?.InvoicePdf?.statusCode === "200") {
      showToastMessage("SucessFully invoice Added");
    }
  }, [InvoicePageData?.InvoicePdf?.statusCode]);
  var b64;
  if (InvoicePageData?.InvoicePdf?.invoicePdf) {
    b64 = InvoicePageData?.InvoicePdf?.invoicePdf;
  }
  if (b64) {
    var obj = document.createElement("object");
    obj.style.width = "100%";
    obj.style.height = "1000pt";
    obj.type = "application/pdf";
    obj.data = "data:application/pdf;base64," + b64;
    // document.body.appendChild(obj);
    var link = document.createElement("a");
    // link.innerHTML = "Download PDF file";
    link.download = "invoice.pdf";
    link.href = "data:application/pdf;base64," + b64;
    document.body.appendChild(link);
    let pdfWindow = window.open("");
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(b64) +
        "'></iframe>"
    );
  }
  return (
    <div>
      <ToastContainer />
      <AddInvoice sucessMessage={InvoicePageData?.InvoicePdf?.statusCode} />
    </div>
  );
}

export default AddInvoicePage;
