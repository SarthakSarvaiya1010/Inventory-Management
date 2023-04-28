import React, { useEffect } from "react";
import UpdateBalanceInfo from "../../Components/BankInfo/UpdateBalance/UpdateBalanceInfo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateBalancePage() {
  const navigate = useNavigate();
  const BankInfoData = useSelector((state) => state?.BankInfoData);

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
    if (BankInfoData?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/bank_info");
      }, 2000);
    }
  }, [BankInfoData?.SucessMessage?.statusCode, navigate]);

  useEffect(() => {
    if (BankInfoData?.ErrorMessage?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [BankInfoData?.ErrorMessage?.statusCode]);
  console.log("BankInfoData?.ErrorMessage?.data", BankInfoData?.ErrorMessage);
  return (
    <div>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {BankInfoData?.SucessMessage?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {BankInfoData?.SucessMessage?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {BankInfoData?.ErrorMessage?.message}
          </Alert>
        )}
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      <UpdateBalanceInfo />
    </div>
  );
}

export default UpdateBalancePage;
