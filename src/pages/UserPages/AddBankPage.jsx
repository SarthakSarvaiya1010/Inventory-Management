import React, { useEffect } from "react";
import AddBank from "../../Components/BankInfo/AddBank/AddBank";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";
import SanckBar from "../../Helpers/SanckBar/SanckBar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AddBankPage() {
  const BankInfoData = useSelector((state) => state?.BankInfoData);
  const navigate = useNavigate();
  const [openD, setOpenD] = React.useState(false);
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
    if (BankInfoData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [BankInfoData?.ErrorMessage?.statusCode]);

  return (
    <div>
      <SanckBar
        alertMessage={BankInfoData?.SucessMessage?.message}
        alertErrorMessage={BankInfoData?.ErrorMessage?.message}
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
      {openD ? null : <AddBank />}
    </div>
  );
}

export default AddBankPage;
