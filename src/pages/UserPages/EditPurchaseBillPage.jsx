import React, { useEffect } from "react";
import EditPurchaseBill from "../../Components/PurchaseBill/EditPurchaseBill/EditPurchaseBill";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditPurchaseBillPage() {
  const navigate = useNavigate();
  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  const PurchaseData = useSelector((state) => state?.PurchaseData);
  const invoivepagedata = JSON.parse(
    localStorage.getItem("PurchaseAddPageData")
  );
  console.log("PurchaseData?.PurchaseEdit", PurchaseData?.PurchaseEdit);
  const testData = PurchaseData?.PurchaseEdit?.length
    ? PurchaseData?.PurchaseEdit[0]
    : invoivepagedata[0]
    ? invoivepagedata
    : [{}];

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
    if (PurchaseData?.PurchaseEdit.length) {
      localStorage.setItem(
        "PurchaseAddPageData",
        JSON.stringify(PurchaseData?.PurchaseEdit)
      );
    }
  }, [PurchaseData?.PurchaseEdit]);
  useEffect(() => {
    if (PurchaseData?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/purchasebill");
      }, 2000);
    }
  }, [PurchaseData?.SucessMessage?.statusCode, navigate]);

  useEffect(() => {
    if (PurchaseData?.ErrorMessage?.data?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [PurchaseData?.ErrorMessage?.data?.statusCode]);
  useEffect(() => {
    if (PurchaseData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [PurchaseData?.ErrorMessage?.statusCode]);
  return (
    <div>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {PurchaseData?.SucessMessage?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {PurchaseData?.SucessMessage?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {/* {Customers?.ErrorMessage?.data?.message} */}{" "}
            {"Oppps ,Something went wrong"}
          </Alert>
        )}
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : (
        <EditPurchaseBill
          testData={testData}
          EditInvoiceSucessMessage={InvoicePageData?.InvoicePdf?.statusCode}
        />
      )}
    </div>
  );
}

export default EditPurchaseBillPage;
