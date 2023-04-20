import React, { useEffect } from "react";
import PaymentMode from "../../Components/PurchaseBill/PaymentMode/PaymentMode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SanckBar from "../../Helpers/SanckBar/SanckBar";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaymentModePage() {
  const BankData = useSelector((state) => state?.BankData);
  console.log("BankInfoData?.ErrorMessage", BankData?.ErrorMessage);
  const navigate = useNavigate();
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
      <PaymentMode />
    </div>
  );
}

export default PaymentModePage;