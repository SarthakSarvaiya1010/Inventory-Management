import React, { useEffect } from "react";
import ViewDeletedPurchaseBillList from "../../Components/PurchaseBill/ViewDeletedPurchaseBillList/ViewDeletedPurchaseBillList";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeletePurchasPage() {
  const PurchaseData = useSelector((state) => state?.PurchaseData);

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
    if (PurchaseData?.SucessMessageOfPurchaseDelete?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [PurchaseData?.SucessMessageOfPurchaseDelete?.statusCode]);
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
          {PurchaseData?.SucessMessageOfPurchaseDelete?.message}
        </Alert>
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      <ViewDeletedPurchaseBillList />
    </div>
  );
}

export default DeletePurchasPage;
