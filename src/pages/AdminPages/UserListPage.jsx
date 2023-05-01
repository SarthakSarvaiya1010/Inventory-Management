import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserList from "../../Components/User/UserList/UserList";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogBox from "../../Helpers/DialogBox/SessionDialogBox";
import { useNavigate } from "react-router-dom";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserListPage() {
  const navigate = useNavigate();
  const User = useSelector((state) => state?.User);
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
    if (User?.ErrorMessage?.statusCode === "403") {
      setOpenD(true);
    }
  }, [User?.ErrorMessage?.statusCode, navigate]);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {User?.SucessMessage?.message}
        </Alert>
      </Snackbar>
      <DialogBox open={openD} DialogText={"Session is expired please logIn"} />
      {openD ? null : <UserList />}
    </div>
  );
}

export default UserListPage;
