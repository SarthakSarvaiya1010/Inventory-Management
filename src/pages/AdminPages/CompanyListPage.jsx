import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CompanyList from "../../Components/Company/CompanyList/CompanyList";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CompanyListPage() {
  const navigate = useNavigate();
  const CompanyInfo = useSelector((state) => state?.CompanyInfo);

  const [openD, setOpenD] = React.useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    if (CompanyInfo?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/companylist");
        window.location.reload();
      }, 2000);
    }
  }, [CompanyInfo?.SucessMessage?.statusCode, navigate]);

  useEffect(() => {
    if (CompanyInfo?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [CompanyInfo?.ErrorMessage?.statusCode, navigate]);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {CompanyInfo?.SucessMessage?.message}
        </Alert>
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <CompanyList />}
    </div>
  );
}

export default CompanyListPage;
