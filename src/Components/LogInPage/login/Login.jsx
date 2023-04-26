/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import "./Login.css";
import Button from "@mui/material/Button";
import { userLogin } from "../../../Redux/AuthSlice";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
  const showToastMessage = () => {
    toast.success("Login  Success !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const showToastMessageServerError = () => {
    toast.error("server is offline  !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const showToastMessageError = (data) => {
    toast.error(`${data} !`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const { setOpen } = props;
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [test, setTest] = useState(null);
  const [buttonDisbel, setButtonDisbel] = useState(null);
  const [errors, setErrors] = useState({});
  const [password, setpassWord] = useState(null);
  const LoginInfo = {
    email: email,
    password: password,
  };

  const handleSubmit = () => {
    setTest(true);
    setButtonDisbel(true);
    validation();
    if (
      LoginInfo.password &&
      LoginInfo.email &&
      LoginInfo.password.length >= 6 &&
      /\S+@\S+\.\S+/.test(LoginInfo?.email)
    ) {
      dispatch(userLogin(LoginInfo));
    }
  };

  const validation = () => {
    if (!LoginInfo?.email) {
      setErrors({ email: "Email id is required" });
      setButtonDisbel(false);
    } else if (!/\S+@\S+\.\S+/.test(LoginInfo?.email)) {
      setErrors({
        email: "Email address is invalid",
      });
      setButtonDisbel(false);
    } else if (!LoginInfo?.password) {
      setErrors({
        password: "Password is missing",
      });
      setButtonDisbel(false);
    } else if (LoginInfo?.password?.length < 6) {
      setErrors({
        password: "Password must be 6 or more characters",
      });
      setButtonDisbel(false);
    } else {
      setErrors();
    }
  };

  const navigate = useNavigate();
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  // const NavigateItemName = window.localStorage.getItem("NavigateItemName");
  useEffect(() => {
    if (successLoginData?.LoginData?.statusCode === "200" && test) {
      localStorage.setItem(
        "LoginData",
        JSON.stringify(successLoginData.LoginData)
      );
      localStorage.setItem("AuthError", "Authorization");

      showToastMessage();
      setTest(false);
      setTimeout(() => {
        if (successLoginData?.LoginData?.role_id === 2) {
          navigate("/productlist");
          setButtonDisbel(false);
        } else {
          if (successLoginData?.LoginData?.role_id === 1) {
            navigate("/userlist");
            setButtonDisbel(false);
          }
        }
      }, 2100);
    } else if (
      successLoginData?.FailedLoginData?.status === "server_offline" &&
      test
    ) {
      showToastMessageServerError();
      setButtonDisbel(false);
    } else if (successLoginData?.FailedLoginData?.status === "failed" && test) {
      showToastMessageError(successLoginData?.FailedLoginData?.message);
      setButtonDisbel(false);
    }
  }, [
    navigate,
    successLoginData?.FailedLoginData,
    successLoginData?.LoginData,
    successLoginData?.LoginData?.statusCode,
    test,
  ]);
  // useEffect(() => {
  //   if (accessToken?.role_id === 2) {
  //     if (NavigateItemName) {
  //       navigate(NavigateItemName);
  //     } else {
  //       navigate("/productlist");
  //     }
  //   } else {
  //     if (accessToken?.role_id === 1) {
  //       if (NavigateItemName) {
  //         navigate(NavigateItemName);
  //       } else {
  //         navigate("/userlist");
  //       }
  //     }
  //   }
  // }, [NavigateItemName, accessToken?.role_id, navigate]);
  return (
    <div>
      <div>
        <DialogContent>
          <ToastContainer limit={1} />
          <Stack direction="row" justifyContent="center" alignItems="center">
            <DialogTitle>LogIn</DialogTitle>
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
                error={errors?.email && test ? true : false}
                id="outlined-Email"
                label="Email id"
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validation();
                }}

                // defaultValue="Hello World"
              />
              <p style={{ color: "red", marginLeft: 10, marginTop: 0 }}>
                {test ? errors?.email : null}
              </p>

              <TextField
                required
                error={errors?.password && test ? true : false}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setpassWord(e.target.value);
                  validation();
                }}
              />
              <p style={{ color: "red", marginLeft: 10, marginTop: 0 }}>
                {test ? errors?.password : null}
              </p>
            </Stack>
            <Typography>
              <a href="/resetpassword">ResetPassword</a>
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              disabled={buttonDisbel}
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
      </div>
    </div>
  );
}

export default Login;
