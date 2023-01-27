import React, { useState, useEffect } from "react";
import {
  // AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Dialog,
} from "../../Helpers/indexMui/indexmui";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "../LogInPage/login/Login";
import { Transition } from "../../Helpers/BootstrapButton/BootstrapButton";
// import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import { useSelector } from "react-redux";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header(props) {
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  console.log("successLoginData", successLoginData);
  const [open, setOpen] = useState(null);
  const { openManu, setOpenManu } = props;

  useEffect(() => {
    if (successLoginData.LoginData.statusCode === "200") {
      setOpen(false);
      setOpenManu(true);
    }
  }, [setOpenManu, successLoginData.LoginData.statusCode]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const handleDrawerOpen = () => {
    if (
      successLoginData?.LoginData?.statusCode === "200" ||
      accessToken?.statusCode
    ) {
      setOpenManu(true);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={openManu}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(openManu && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {successLoginData.LoginData.statusCode === "200" ||
          accessToken?.statusCode ? (
            <Typography variant="h5" component="div">
              Hello, 'user_name'
            </Typography>
          ) : (
            <div>
              <Button
                color="inherit"
                onClick={() => {
                  handleClickOpen(true);
                }}
              >
                sign in
              </Button>
              <Button color="inherit">sign up</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Login setOpen={setOpen} />
      </Dialog>
    </Box>
  );
}
