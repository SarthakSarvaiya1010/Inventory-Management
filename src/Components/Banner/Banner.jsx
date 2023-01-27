import React, { useState, useEffect } from "react";
import {
  Box,
  ListItemButton,
  Divider,
  IconButton,
  Drawer,
  ListItemIcon,
  ListItem,
  List,
  ListItemText,
  CssBaseline,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useSelector } from "react-redux";
import HomePage from "../HomePage/HomePage";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Banner(props) {
  const { openManu, setOpenManu } = props;
  console.log(openManu);
  const theme = useTheme();
  const [Item, setItem] = useState("Product");
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  useEffect(() => {
    if (successLoginData.LoginData.statusCode === "200") {
      // alert("done");
      // navigate("/ProductList");
    }
  }, [successLoginData.LoginData.statusCode]);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={openManu}
        >
          <DrawerHeader>
            <IconButton onClick={() => setOpenManu(false)}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              "Product",
              "Product Type",
              "Tax",
              "Invoice",
              "Stock Report",
              "Party Info",
            ].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ backgroundColor: Item === text ? "#BEC5AD" : "" }}
              >
                <ListItemButton
                  onClick={() => {
                    setItem(text);
                  }}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <Inventory2Icon /> : <ReceiptIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={openManu}>
          <DrawerHeader />
          <HomePage />
        </Main>
      </Box>
    </div>
  );
}

export default Banner;
