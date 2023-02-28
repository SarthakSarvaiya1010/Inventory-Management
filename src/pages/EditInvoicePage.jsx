import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InvoiceEdit from "../Components/Invoice/InvoiceEdit/InvoiceEdit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function EditInvoicePage() {
  const navigate = useNavigate();
  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  console.log(
    "InvoicePageData?.SuccessMessageOfInvoiceEdit",
    InvoicePageData?.SuccessMessageOfInvoiceEdit?.invoicePdf
  );
  const invoivepagedata = JSON.parse(
    localStorage.getItem("InvoiceEditPageData")
  );
  const testData = InvoicePageData?.invoiceEdit?.length
    ? InvoicePageData?.invoiceEdit[0]
    : invoivepagedata[0]
    ? invoivepagedata
    : [{}];
  const showToastMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/invoice_list");
    }, 2000);
  };
  useEffect(() => {
    if (InvoicePageData?.invoiceEdit.length) {
      localStorage.setItem(
        "InvoiceEditPageData",
        JSON.stringify(InvoicePageData?.invoiceEdit)
      );
    }
  }, [InvoicePageData?.invoiceEdit]);
  useEffect(() => {
    if (InvoicePageData?.SuccessMessageOfInvoiceEdit?.statusCode === "200") {
      showToastMessage(InvoicePageData?.SuccessMessageOfInvoiceEdit?.message);
    }
  });
  var b64;
  if (InvoicePageData?.SuccessMessageOfInvoiceEdit?.invoicePdf) {
    b64 = InvoicePageData?.SuccessMessageOfInvoiceEdit?.invoicePdf;
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
      <InvoiceEdit
        testData={testData}
        EditInvoiceSucessMessage={
          InvoicePageData?.SuccessMessageOfInvoiceEdit?.statusCode
        }
      />
    </div>
  );
}
