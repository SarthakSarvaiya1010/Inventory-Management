import React, { useEffect } from "react";
import AddCompanyInfo from "../../Components/Company/AddCompany/AddCompanyInfo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddCompanyPage() {
  const CompanyInfoData = useSelector((state) => state?.CompanyInfo);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [openD, setOpenD] = React.useState(false);
  useEffect(() => {
    if (CompanyInfoData?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/companylist");
      }, 2000);
    }
  }, [CompanyInfoData?.SucessMessage?.statusCode, navigate]);
  useEffect(() => {
    if (CompanyInfoData?.ErrorMessage?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [CompanyInfoData?.ErrorMessage?.statusCode]);
  useEffect(() => {
    if (CompanyInfoData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [CompanyInfoData?.ErrorMessage?.statusCode]);
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const { vertical, horizontal, open } = state;

  return (
    <div>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {CompanyInfoData?.SucessMessage?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {CompanyInfoData?.SucessMessage?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {CompanyInfoData?.ErrorMessage?.message}
          </Alert>
        )}
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <AddCompanyInfo />}
    </div>
  );
}

export default AddCompanyPage;
