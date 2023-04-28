import React, { useState } from "react";
import { useEffect } from "react";
import AddInvoice from "../../Components/Invoice/AddInvoice/AddInvoice";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

import { useNavigate } from "react-router-dom";
import SanckBar from "../../Helpers/SanckBar/SanckBar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddInvoicePage() {
  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  const [pdfOpen, setpdfOpen] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [openD, setOpenD] = React.useState(false);
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    if (InvoicePageData?.InvoicePdf?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setDisabled(true);
      setTimeout(() => {
        navigate("/invoice_list");
        window.location.reload();
      }, 2000);
    }
  }, [InvoicePageData?.InvoicePdf?.statusCode, navigate]);

  useEffect(() => {
    if (InvoicePageData?.ErrorMessage?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
    if (InvoicePageData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [InvoicePageData?.ErrorMessage?.statusCode]);
  console.log("InvoicePageData()*_)", InvoicePageData?.ErrorMessage?.message);

  var b64;
  if (InvoicePageData?.InvoicePdf?.invoicePdf) {
    b64 = InvoicePageData?.InvoicePdf?.invoicePdf;
  }
  if (b64 && pdfOpen) {
    setpdfOpen(false);
    var obj = document.createElement("object");
    obj.style.width = "100%";
    obj.style.height = "1000pt";
    obj.type = "application/pdf";
    obj.data = "data:application/pdf;base64," + b64;
    var link = document.createElement("a");
    link.download = "invoice.pdf";
    link.href = "data:application/pdf;base64," + b64;
    document.body.appendChild(link);
    setTimeout(() => {
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(b64) +
          "'></iframe>"
      );
    }, 1000);
  }
  return (
    <div>
      <SanckBar
        alertMessage={InvoicePageData?.SucessMessage?.message}
        alertErrorMessage={InvoicePageData?.ErrorMessage?.message}
        state={state}
        setState={setState}
      />
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {InvoicePageData?.InvoicePdf?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {InvoicePageData?.InvoicePdf?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {/* {Customers?.ErrorMessage?.data?.message} */}
            {InvoicePageData?.ErrorMessage?.message}
          </Alert>
        )}
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : (
        <AddInvoice
          sucessMessage={InvoicePageData?.InvoicePdf?.statusCode}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default AddInvoicePage;
