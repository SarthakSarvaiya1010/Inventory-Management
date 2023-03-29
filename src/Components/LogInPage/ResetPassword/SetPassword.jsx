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
// import { Transition } from "../../Helpers/BootstrapButton/BootstrapButton";
import { Transition } from "../../../Helpers/BootstrapButton/BootstrapButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setPassword } from "../../../Store/Action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { resetPasswordlinkcheck } from "../../../Redux/AuthSlice";

function SetPassword() {
  const [open, setOpen] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [password, setpassWord] = useState(null);
  const [confrompassword, setConfrompassword] = useState(null);
  const [error, setError] = useState(null);
  const [linkstatus, setLinkstatus] = useState(null);
  const SetPasswordMassge = useSelector((state) => state?.UserLoginReducer);

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
  useEffect(() => {
    dispatch(resetPasswordlinkcheck(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (SetPasswordMassge.passwordLinkStatus.statusCode === "400") {
      setLinkstatus(true);
      setOpen(false);
      alert("hello");
    }
  }, [SetPasswordMassge.passwordLinkStatus.statusCode]);

  const ResendLink = () => {
    navigate("/resetpassword");
  };
  const handleSubmit = () => {
    // setButtonDisbel(true);
    // setTest(true);
    if (password) {
      if (password?.length > 6) {
        if (confrompassword === password) {
          dispatch(setPassword(id, LoginInfo));
        } else {
          setError({
            confirmpassword: "Confrompassword is not match",
          });
        }
      } else {
        setError({ password: "password is short" });
      }
    } else {
      setError({ password: "password is empty" });
    }
  };

  return (
    <div>
      {linkstatus ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="login-wrapper"
          >
            <h2 className="reset">Reset Password Link Expired</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="img-container">
                <div className="img-session">
                  <img alt="#" src="../linkexpie.png"></img>
                </div>
              </div>
              <div style={{ width: "50%" }}>
                <h6>
                  Hi, there your magic reset password link has expired, because
                  you haven't used it. Reset Password link expires in every 10
                  minutes and can only be used once. You can create one by
                  clicking on Request button too.
                </h6>
              </div>
              <button className="linkEx-btn" onClick={ResendLink}>
                Forget Password
              </button>
            </div>
          </div>
        </div>
      ) : (
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
                  error={error?.password ? true : null}
                  // defaultValue="Hello World"
                />
                {error?.password ? (
                  <>
                    <b
                      style={{
                        color: "red",
                        fontSize: "15px",
                        marginLeft: "10px",
                        marginTop: "0px",
                      }}
                    >
                      {error?.password}
                    </b>
                    <br />
                  </>
                ) : null}
                <TextField
                  required
                  id="outlined-Email"
                  label="Confrom Password"
                  autoComplete="off"
                  type="password"
                  onChange={(e) => setConfrompassword(e.target.value)}
                  error={error?.confirmpassword ? true : null}
                  // defaultValue="Hello World"
                />
                {error?.confirmpassword ? (
                  <>
                    <b
                      style={{
                        color: "red",
                        fontSize: "15px",
                        marginLeft: "10px",
                        marginTop: "0px",
                      }}
                    >
                      {error?.confirmpassword}
                    </b>
                    <br />
                  </>
                ) : null}
              </Stack>
            </Box>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Button
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
      )}
    </div>
  );
}

export default SetPassword;
