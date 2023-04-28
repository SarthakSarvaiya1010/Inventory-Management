import React, { useEffect } from "react";
import AddUser from "../../Components/User/AddUser/AddUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";

import SanckBar from "../../Helpers/SanckBar/SanckBar";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddUserPage() {
  const User = useSelector((state) => state?.User);
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
  console.log("UserUser++>", User?.ErrorMessage);
  useEffect(() => {
    if (User?.SucessMessage?.statusCode === "200") {
      setState({ open: true, vertical: "top", horizontal: "center" });
      setTimeout(() => {
        navigate("/userlist");
      }, 2000);
    }
  }, [User?.SucessMessage?.statusCode, navigate]);
  useEffect(() => {
    if (User?.ErrorMessage?.statusCode === "400") {
      setState({ open: true, vertical: "top", horizontal: "center" });
    }
  }, [User?.ErrorMessage?.statusCode]);
  return (
    <div>
      <SanckBar
        alertMessage={User?.SucessMessage?.message}
        alertErrorMessage={User?.ErrorMessage?.message}
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
        {User?.SucessMessage?.message ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {User?.SucessMessage?.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {User?.ErrorMessage?.message}
          </Alert>
        )}
      </Snackbar>
      <AddUser />
    </div>
  );
}

export default AddUserPage;
