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
  DeleteTaxPage,
  InvoiceListPage,
  AddInvoicePage,
  EditInvoicePage,
} from "./pages/index";
import ListUser from "./Components/UserData/ListUser";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import "./App.css";
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
    padding: theme.spacing(2),
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

const route = [
  { path: "/", element: <HomePage /> },
  { path: "/productlist", element: <ProductListPage /> },
  { path: "/addproduct", element: <AddProductPage /> },
  { path: "/product/edit/:id", element: <AddProductPage /> },
  { path: "/customerList", element: <CustomerListPage /> },
  { path: "/addcustomer", element: <AddCustomerPage /> },
  { path: "/customer/edit/:id", element: <AddCustomerPage /> },
  { path: "/deletedproduct", element: <DeletedProductListPage /> },
  { path: "/deletedcustomer", element: <DeletedCustomerListPage /> },
  { path: "/TaxList", element: <TaxListPage /> },
  { path: "/InvoiceList/edit/:id", element: <EditInvoicePage /> },
  { path: "/addtax", element: <AddTaxPage /> },
  { path: "/tax/edit/:id", element: <AddTaxPage /> },
  { path: "/deletedtax", element: <DeleteTaxPage /> },
  { path: "/listuser", element: <ListUser /> },
  { path: "/InvoiceList", element: <InvoiceListPage /> },
  { path: "/addinvoice", element: <AddInvoicePage /> },
];

function App() {
  const [openManu, setOpenManu] = useState(false);
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
                {route.map((route) => {
                  return (
                    <Route path={route.path} element={route.element}></Route>
                  );
                })}
              </Routes>
            </Main>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
