import React, { useState } from "react";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ProductListPage,
  AddProductPage,
  SideBar,
  CustomerListPage,
  AddCustomerPage,
  DeletedProductListPage,
  DeletedCustomerListPage,
  TaxListPage,
  AddTaxPage,
} from "./pages/index";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: "#519872",
    },
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
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
function App() {
  const [openManu, setOpenManu] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={outerTheme}>
          <Header openManu={openManu} setOpenManu={setOpenManu} />
          <Box sx={{ display: "flex" }}>
            <SideBar openManu={openManu} setOpenManu={setOpenManu} />
            <Main open={openManu}>
              <DrawerHeader />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/productList" element={<ProductListPage />} />
                <Route path="/addproduct" element={<AddProductPage />} />
                <Route path="/product/edit/:id" element={<AddProductPage />} />
                <Route path="/customerList" element={<CustomerListPage />} />
                <Route path="/addcustomer" element={<AddCustomerPage />} />
                <Route
                  path="/customer/edit/:id"
                  element={<AddCustomerPage />}
                />
                <Route
                  path="/deletedproduct"
                  element={<DeletedProductListPage />}
                />
                <Route
                  path="/deletedcustomer"
                  element={<DeletedCustomerListPage />}
                />
                <Route path="/TaxList" element={<TaxListPage />} />
                <Route path="/addtax" element={<AddTaxPage />} />
                <Route path="/tax/edit/:id" element={<AddTaxPage />} />
              </Routes>
            </Main>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
