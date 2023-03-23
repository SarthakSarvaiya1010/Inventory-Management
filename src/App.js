import React, { useEffect, useState } from "react";
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
  CompanyInfoPage,
  ResetPasswordPage,
  SetPasswordPage,
} from "./pages/UserPages/index";
import {
  HomePageAdmin,
  AdminSideBar,
  CompanyListPage,
  UserListPage,
  UserDeleteListPage,
  AddUserPage,
  DeleteCompanyListPage,
  AddCompanyPage,
} from "./pages/AdminPages/index";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import "./App.css";
import ViewDeletedInvoiceList from "./Components/Invoice/ViewDeletedInvoice/ViewDeletedInvoiceList";
import Protected from "./pages/Protected/Protected";

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
  { path: "/productlist", element: <ProductListPage /> },
  { path: "/addproduct", element: <AddProductPage /> },
  { path: "/product/edit/:id", element: <AddProductPage /> },
  { path: "/customer_list", element: <CustomerListPage /> },
  { path: "/addcustomer", element: <AddCustomerPage /> },
  { path: "/customer/edit/:id", element: <AddCustomerPage /> },
  { path: "/deletedproduct", element: <DeletedProductListPage /> },
  { path: "/deletedcustomer", element: <DeletedCustomerListPage /> },
  { path: "/tax_list", element: <TaxListPage /> },
  { path: "/InvoiceList/edit/:id", element: <EditInvoicePage /> },
  { path: "/addtax", element: <AddTaxPage /> },
  { path: "/tax/edit/:id", element: <AddTaxPage /> },
  { path: "/deletedtax", element: <DeleteTaxPage /> },
  { path: "/invoice_list", element: <InvoiceListPage /> },
  { path: "/addinvoice", element: <AddInvoicePage /> },
  { path: "/viewdeletedinvoice", element: <ViewDeletedInvoiceList /> },
  { path: "/company_info", element: <CompanyInfoPage /> },
];
const adminroute = [
  { path: "/homepage", element: <HomePageAdmin /> },
  { path: "/companylist", element: <CompanyListPage /> },
  { path: "/addcompany", element: <AddCompanyPage /> },
  { path: "/deletecompanylist", element: <DeleteCompanyListPage /> },
  { path: "/company/edit/:id", element: <CompanyInfoPage /> },
  { path: "/userlist", element: <UserListPage /> },
  { path: "/userdeletelist", element: <UserDeleteListPage /> },
  { path: "/adduser", element: <AddUserPage /> },
  { path: "/user/edit/:id", element: <AddUserPage /> },
];

function App() {
  const [openManu, setOpenManu] = useState(false);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const [user, setUser] = useState(
    accessToken?.role_id === 2
      ? {
          roles: ["user"],
        }
      : accessToken?.role_id === 1
      ? {
          roles: ["admin"],
        }
      : "not"
  );
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  console.log(
    "!!user && user?.roles?.includes(user)",
    !!user && user?.roles?.includes("user")
  );
  useEffect(() => {
    if (
      successLoginData?.LoginData?.role_id === 2 ||
      accessToken?.role_id === 2
    ) {
      setUser({
        roles: ["user"],
      });
    }
    if (
      successLoginData?.LoginData?.role_id === 1 ||
      accessToken?.role_id === 1
    ) {
      setUser({
        roles: ["admin"],
      });
    }
  }, [accessToken?.role_id, successLoginData?.LoginData?.role_id]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={outerTheme}>
          <Header openManu={openManu} setOpenManu={setOpenManu} />
          <Box sx={{ display: "flex" }}>
            {successLoginData?.LoginData?.role_id === 2 ||
            accessToken?.role_id === 2 ? (
              <SideBar openManu={openManu} setOpenManu={setOpenManu} />
            ) : (
              <AdminSideBar openManu={openManu} setOpenManu={setOpenManu} />
            )}
            <Main open={openManu}>
              <DrawerHeader />
              <Routes>
                <Route
                  path="/"
                  element={
                    // <Protected isAllowed={!!!accessToken} redirectPath="/login">
                    <HomePage />
                    // </Protected>
                  }
                />
                <Route
                  path="/resetpassword"
                  element={
                    // <Protected isAllowed={!!!accessToken} redirectPath="/login">
                    <ResetPasswordPage />
                    // </Protected>
                  }
                />
                <Route
                  path="/resetpassword/:id"
                  element={
                    // <Protected isAllowed={!!!accessToken} redirectPath="/login">
                    <SetPasswordPage />
                    // </Protected>
                  }
                />
                {route.map((route) => {
                  return (
                    <Route
                      path={route.path}
                      element={
                        <Protected
                          isAllowed={!!user && user?.roles?.includes("user")}
                          redirectPath="/"
                        >
                          {route.element}
                        </Protected>
                      }
                    ></Route>
                  );
                })}
                {adminroute.map((route) => {
                  return (
                    <Route
                      path={route.path}
                      element={
                        <Protected
                          isAllowed={!!user && user?.roles?.includes("admin")}
                          redirectPath="/"
                        >
                          {route.element}
                        </Protected>
                      }
                    ></Route>
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
