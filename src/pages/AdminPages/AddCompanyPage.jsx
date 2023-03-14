import React, { useEffect } from "react";
import AddCompanyInfo from "../../Components/Company/AddCompany/AddCompanyInfo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
  useEffect(() => {
    if (CompanyInfoData?.SucessMessageOfEditCompanyInfo?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        localStorage.setItem("NavigateItemName", "company_info");
        navigate("/company_info");
      }, 2000);
    }
  }, [CompanyInfoData?.SucessMessageOfEditCompanyInfo?.statusCode, navigate]);
  useEffect(() => {
    if (
      CompanyInfoData?.ErrorMessageOfEditComapanyInfo?.data?.statusCode === 400
    ) {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [
    CompanyInfoData?.ErrorMessageOfEditComapanyInfo?.data?.statusCode,
    CompanyInfoData?.ErrorMessageOfEditComapanyInfo?.data?.message,
  ]);
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
        {CompanyInfoData?.SucessMessageOfEditCompanyInfo?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {CompanyInfoData?.SucessMessageOfEditCompanyInfo?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {CompanyInfoData?.ErrorMessageOfEditComapanyInfo?.data?.message}
          </Alert>
        )}
      </Snackbar>
      <AddCompanyInfo />
    </div>
  );
}

export default AddCompanyPage;
