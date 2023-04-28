import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PurchaseBillLis from "../../Components/PurchaseBill/PurchaseBillList/PurchaseBillList";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PurchaseBillPage() {
  const PurchaseData = useSelector((state) => state?.PurchaseData);
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
    if (PurchaseData?.SucessMessageOfPurchaseDelete?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      window.location.reload();
    }
  }, [PurchaseData?.SucessMessageOfPurchaseDelete?.statusCode]);
  useEffect(() => {
    if (PurchaseData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [PurchaseData?.ErrorMessage?.statusCode]);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {PurchaseData?.SucessMessageOfInvoiceDelete?.message}
        </Alert>
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <PurchaseBillLis />}
    </div>
  );
}

export default PurchaseBillPage;
