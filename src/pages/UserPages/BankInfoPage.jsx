import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BankInfoList from "../../Components/BankInfo/BankInfoList/BankInfoList";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function BankInfoPage() {
  const BankInfoData = useSelector((state) => state?.BankInfoData);
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
    if (BankInfoData?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/bank_info");
        window.location.reload();
      }, 2000);
    }
  }, [BankInfoData?.SucessMessage?.statusCode, navigate]);

  useEffect(() => {
    if (BankInfoData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [BankInfoData?.ErrorMessage?.statusCode]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {BankInfoData?.SucessMessage?.message}
        </Alert>
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <BankInfoList />}
    </div>
  );
}

export default BankInfoPage;
