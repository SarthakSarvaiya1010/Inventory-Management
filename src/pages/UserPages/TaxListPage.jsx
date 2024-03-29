import React, { useEffect } from "react";
import TaxList from "../../Components/Tax/TaxList/TaxList";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TaxListPage() {
  const TaxData = useSelector((state) => state?.TaxData);
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
    if (TaxData?.SuccessDeleteTaxMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/tax_list");
        window.location.reload();
      }, 2000);
    }
  }, [TaxData?.SuccessDeleteTaxMessage?.statusCode, navigate]);
  useEffect(() => {
    if (TaxData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [TaxData?.ErrorMessage?.statusCode]);
  return (
    <div>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {TaxData?.SuccessDeleteTaxMessage?.message}
        </Alert>
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <TaxList />}
    </div>
  );
}

export default TaxListPage;
