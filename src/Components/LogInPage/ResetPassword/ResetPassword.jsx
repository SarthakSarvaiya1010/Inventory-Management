import React, { useEffect, useState } from "react";
import {
  TextField,
  DialogContent,
  DialogTitle,
  Dialog,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Transition } from "../../../Helpers/BootstrapButton/BootstrapButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../../../Store/Action/AuthAction";
import { useNavigate } from "react-router";

function ResetPassword() {
  const showToastMessage = () => {
    toast.success("Link is send !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ResetPasswordMassge = useSelector((state) => state?.UserLoginReducer);
  const [email, setEmail] = useState(null);
  const LoginInfo = {
    email: email,
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    // setButtonDisbel(true);
    // setTest(true);
    dispatch(resetPassword(LoginInfo));
    console.log("LoginInfo", LoginInfo);
  };
  console.log("ResetPasswordMassge", ResetPasswordMassge?.ResetPasswordMassge);

  useEffect(() => {
    if (ResetPasswordMassge?.ResetPasswordMassge?.status === "success") {
      showToastMessage();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [ResetPasswordMassge?.ResetPasswordMassge?.status, navigate]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <ToastContainer />
          <Stack direction="row" justifyContent="center" alignItems="center">
            <DialogTitle>ResetPassword</DialogTitle>
          </Stack>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Stack direction="column" spacing={2}>
              <TextField
                required
                id="outlined-Email"
                label="Email id"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}

                // defaultValue="Hello World"
              />
            </Stack>
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              disabled={!email}
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResetPassword;
