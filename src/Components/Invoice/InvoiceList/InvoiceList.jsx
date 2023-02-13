import React, { useEffect } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { InvoiceListAction } from "../../../Store/Action/InvoiceAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import { convert } from "../../../Helpers/misc";
import { GetinvoiceAddPageAction } from "../../../Store/Action/InvoiceAction";

function InvoiceList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const InvoiceData = useSelector((state) => state?.InvoiceData);
  const data = [];
  console.log("successLoginData", InvoiceData);

  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  useEffect(() => {
    if (successLoginData?.LoginData?.accessToken || accessToken?.accessToken) {
      dispatch(
        InvoiceListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken
        )
      );
    }
  }, [
    accessToken?.accessToken,
    dispatch,
    successLoginData?.LoginData?.accessToken,
  ]);
  // eslint-disable-next-line array-callback-return
  InvoiceData.invoiceList.map((e) => {
    let elements = {};
    elements["BILL No"] = `0${e.bill_no}`;
    elements["Invoice Date"] = convert(e.invoice_date);
    elements["Name"] = e.customer_name;
    elements["Total Amount"] = e.taxable_amount;
    data.push(elements);
  });
  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  const headalEdit = (data) => {
    navigate(
      `/InvoiceList/edit/${InvoiceData.invoiceList[data - 1]?.invoice_id}`
    );
  };
  const NavigateAddInvoice = () => {
    console.log("click on invoice");
    dispatch(GetinvoiceAddPageAction(accessToken?.accessToken));
    if (InvoicePageData?.GetInvoicePagData?.length) {
      navigate("/addinvoice");
    }
  };
  useEffect(() => {
    if (InvoicePageData?.GetInvoicePagData?.length) {
      navigate("/addinvoice");
    }
  });
  const headalDelete = (data) => {
    // dispatch(
    //   ProductDeleteAction(
    //     successLoginData?.LoginData?.accessToken,
    //     InvoiceData.invoiceList[data - 1]?.product_id
    //   )
    // );
    window.location.reload();
  };

  return (
    <div>
      {InvoiceData?.invoiceList.length ? (
        <Container fixed>
          <Header name={"InvoiceList"} SearchBar={true} />
          <Container fixed sx={{ backgroundColor: "#EAEFF2" }}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              spacing={4}
              sx={{ p: 4 }}
            >
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => NavigateAddInvoice()}
              >
                add invoice
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/deletedproduct");
                }}
              >
                view deleted invoice
              </Button>
            </Stack>

            <Table
              data={data}
              headalEdit={headalEdit}
              headalDelete={headalDelete}
            />
          </Container>
        </Container>
      ) : (
        <Stack
          sx={{ color: "grey.500", height: "80vh" }}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="success" size="5rem" />
        </Stack>
      )}
    </div>
  );
}

export default InvoiceList;
