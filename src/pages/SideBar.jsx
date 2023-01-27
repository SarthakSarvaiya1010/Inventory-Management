import React, { useState } from "react";
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
import { useNavigate } from "react-router";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function SideBar(props) {
  const navigate = useNavigate();

  const { openManu, setOpenManu } = props;

  const theme = useTheme();
  const [Item, setItem] = useState("Product");

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
              "customer",
            ].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ backgroundColor: Item === text ? "#BEC5AD" : "" }}
              >
                <ListItemButton
                  onClick={() => {
                    setItem(text);
                    navigate(`/${text}List`);
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
      </Box>
    </div>
  );
}

export default SideBar;
