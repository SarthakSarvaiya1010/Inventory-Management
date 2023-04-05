import React, { useEffect } from "react";
import EditPurchaseBill from "../../Components/PurchaseBill/EditPurchaseBill/EditPurchaseBill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { GetinvoiceAddPageAction } from "../../Redux/InvoiceRedux/InvoiceThunk";
import { GetPurchaseEditDataAction } from "../../Redux/PurchaseBillRedux/PurchaseBillThank";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditPurchaseBillPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  const PurchaseData = useSelector((state) => state?.PurchaseData);
  console.log("PurchaseDataPurchaseData", PurchaseData);
  const invoivepagedata = JSON.parse(
    localStorage.getItem("InvoiceEditPageData")
  );
  const testData = PurchaseData?.PurchaseEdit?.length
    ? PurchaseData?.PurchaseEdit[0]
    : invoivepagedata[0]
    ? invoivepagedata
    : [{}];

  console.log(
    "PurchaseData?.PurchaseEdit?.length",
    testData,
    PurchaseData?.PurchaseEdit
  );
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
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
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    dispatch(GetinvoiceAddPageAction());
    dispatch(GetPurchaseEditDataAction(id));
  }, [dispatch, id]);

  return (
    <div>
      <Snackbar
        autoHideDuration={4000}
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
            {/* {Customers?.ErrorMessage?.data?.message} */}{" "}
            {"Oppps ,Something went wrong"}
          </Alert>
        )}
      </Snackbar>
      {testData?.productlistdata?.length ? (
        <EditPurchaseBill
          testData={testData}
          EditInvoiceSucessMessage={InvoicePageData?.InvoicePdf?.statusCode}
        />
      ) : null}
    </div>
  );
}

export default EditPurchaseBillPage;
