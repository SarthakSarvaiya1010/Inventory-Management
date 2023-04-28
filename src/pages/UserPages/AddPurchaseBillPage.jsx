import React, { useEffect } from "react";
import AddPurchaseBill from "../../Components/PurchaseBill/AddPurchaseBill/AddPurchaseBill";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

import SanckBar from "../../Helpers/SanckBar/SanckBar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddPurchaseBillPage() {
  const PurchaseData = useSelector((state) => state?.PurchaseData);
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
    if (PurchaseData?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/purchasebill");
      }, 2000);
    }
  }, [PurchaseData?.SucessMessage?.statusCode, navigate]);

  useEffect(() => {
    if (PurchaseData?.ErrorMessage?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
    if (PurchaseData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [PurchaseData?.ErrorMessage?.statusCode]);

  return (
    <div>
      <SanckBar
        alertMessage={PurchaseData?.SucessMessage?.message}
        alertErrorMessage={PurchaseData?.ErrorMessage?.data?.message}
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
            {PurchaseData?.ErrorMessage?.data?.message}
          </Alert>
        )}
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <AddPurchaseBill />}
    </div>
  );
}

export default AddPurchaseBillPage;
