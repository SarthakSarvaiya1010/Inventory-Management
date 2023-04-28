import React, { useEffect } from "react";
import EditCompanyInfo from "../../Components/Company/EditCompanyInfo/EditCompanyInfo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CompanyInfoPage() {
  const CompanyInfoData = useSelector((state) => state?.CompanyInfo);
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
    if (CompanyInfoData?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/company_info");
        window.location.reload();
      }, 2000);
    }
  }, [CompanyInfoData?.SucessMessage?.statusCode, navigate]);
  useEffect(() => {
    if (CompanyInfoData?.ErrorMessage?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
    if (CompanyInfoData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [CompanyInfoData?.ErrorMessage?.statusCode]);
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
      {openD ? null : <EditCompanyInfo />}
    </div>
  );
}

export default CompanyInfoPage;
