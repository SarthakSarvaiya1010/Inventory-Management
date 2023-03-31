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
import { resetPassword } from "../../../Redux/AuthSlice";
import { useNavigate } from "react-router";

function ResetPassword() {
  const ResetPasswordMassge = useSelector((state) => state?.UserLoginReducer);
  const showToastMessage = () => {
    toast.success("Link is send in your email !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showToastErroMessage = () => {
    toast.error(`${ResetPasswordMassge?.FailedLoginData?.message}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [showToas, setShowToas] = useState(null);
  const LoginInfo = {
    email: email,
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    // setButtonDisbel(true);
    setShowToas(true);
    dispatch(resetPassword(LoginInfo));
  };

  useEffect(() => {
    if (ResetPasswordMassge?.ResetPasswordMassge?.status === "success") {
      showToastMessage();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else if (
      ResetPasswordMassge?.FailedLoginData?.status === "failed" &&
      showToas
    ) {
      showToastErroMessage();
      setShowToas(false);
      setEmail(null);
    }
  }, [
    ResetPasswordMassge?.FailedLoginData?.status,
    ResetPasswordMassge?.ResetPasswordMassge?.status,
    navigate,
    showToas,
    showToastErroMessage,
  ]);

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
              disabled={
                !email ||
                ResetPasswordMassge?.ResetPasswordMassge?.status ===
                  "success" ||
                ResetPasswordMassge?.isLoading
              }
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
