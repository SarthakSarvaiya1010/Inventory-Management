import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AddTax from "../../Components/Tax/AddTax/AddTax";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddTaxPage() {
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
    if (TaxData?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/tax_list");
      }, 2000);
    }
  }, [TaxData?.SucessMessage?.statusCode, navigate]);

  useEffect(() => {
    if (TaxData?.ErrorMessage?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
    if (TaxData?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [TaxData?.ErrorMessage?.statusCode]);
  console.log("TaxData?.ErrorMessage?.data?.statusCode", TaxData?.ErrorMessage);
  return (
    <div>
      {" "}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {TaxData?.SucessMessage?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {TaxData?.SucessMessage?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {TaxData?.ErrorMessage?.message
              ? TaxData?.ErrorMessage?.message
              : "Opps Something Went wrong"}
          </Alert>
        )}
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      <AddTax />
    </div>
  );
}

export default AddTaxPage;
