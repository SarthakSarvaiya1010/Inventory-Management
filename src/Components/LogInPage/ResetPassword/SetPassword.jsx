import React, { useEffect, useState } from "react";
import {
  TextField,
  DialogContent,
  DialogTitle,
  Typography,
  Dialog,
  Stack,
  Box,
  Button,
} from "@mui/material";
// import { Transition } from "../../Helpers/BootstrapButton/BootstrapButton";
import { Transition } from "../../../Helpers/BootstrapButton/BootstrapButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setPassword } from "../../../Store/Action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

function SetPassword() {
  const [open, setOpen] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [password, setpassWord] = useState(null);
  const [confrompassword, setConfrompassword] = useState(null);
  const SetPasswordMassge = useSelector((state) => state?.UserLoginReducer);

  console.log("confrompassword", confrompassword);
  const dispatch = useDispatch();

  const LoginInfo = {
    password: password,
  };
  const handleClose = () => {
    setOpen(false);
  };
  const showToastMessage = () => {
    toast.success("Password Updated", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  useEffect(() => {
    if (SetPasswordMassge?.setPassword?.statusCode === "200") {
      showToastMessage();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [SetPasswordMassge?.setPassword?.statusCode, navigate]);
  const { id } = params;
  const handleSubmit = () => {
    // setButtonDisbel(true);
    // setTest(true);
    dispatch(setPassword(id, LoginInfo));
  };

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
            <DialogTitle>SetPassword</DialogTitle>
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
                label="Password"
                type="password"
                autoComplete="off"
                onChange={(e) => setpassWord(e.target.value)}

                // defaultValue="Hello World"
              />
              <TextField
                required
                id="outlined-Email"
                label="Confrom Password"
                autoComplete="off"
                type="password"
                onChange={(e) => setConfrompassword(e.target.value)}

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
            <Button variant="contained" color="success" onClick={handleSubmit}>
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

export default SetPassword;
