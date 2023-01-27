import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, DialogContent, DialogTitle } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./Login.css";
import Button from "@mui/material/Button";
import { userLogin } from "../../../Store/Action/AuthAction/index";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

function Login(props) {
  const { setOpen } = props;
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [test, setTest] = useState(null);
  const [password, setpassWord] = useState(null);
  const LoginInfo = {
    email: email,
    password: password,
  };
  const handleSubmit = () => {
    setTest(true);
    dispatch(userLogin(LoginInfo));
  };
  const navigate = useNavigate();
  const successLoginData = useSelector((state) => state?.UserLoginReducer);

  useEffect(() => {
    if (successLoginData.LoginData.statusCode === "200" && test) {
      localStorage.setItem(
        "LoginData",
        JSON.stringify(successLoginData.LoginData)
      );
      navigate("/productList");
      setTest(false);
    }
  }, [
    navigate,
    successLoginData.LoginData,
    successLoginData.LoginData.statusCode,
    test,
  ]);

  return (
    <div>
      <div>
        <DialogContent>
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
                id="outlined-Email"
                label="Email id"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}

                // defaultValue="Hello World"
              />
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setpassWord(e.target.value)}
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
      </div>
    </div>
  );
}

export default Login;
