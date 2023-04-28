import React, { useEffect } from "react";
import PaymentMode from "../../Components/PurchaseBill/PaymentMode/PaymentMode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

import SanckBar from "../../Helpers/SanckBar/SanckBar";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaymentModePage() {
  const BankData = useSelector((state) => state?.BankData);
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
    if (BankData?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/bank_info");
      }, 2000);
    }
  }, [BankData?.SucessMessage?.statusCode, navigate]);

  useEffect(() => {
    if (BankData?.ErrorMessage?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [BankData?.ErrorMessage?.statusCode]);
  useEffect(() => {
    if (BankData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [BankData?.ErrorMessage?.statusCode]);
  return (
    <div>
      <SanckBar
        alertMessage={BankData?.SucessMessage?.message}
        alertErrorMessage={BankData?.ErrorMessage?.message}
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
        {BankData?.SucessMessage?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {BankData?.SucessMessage?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {BankData?.ErrorMessage?.message}
          </Alert>
        )}
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <PaymentMode />}
    </div>
  );
}

export default PaymentModePage;
