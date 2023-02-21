/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
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
import UsePagination from "../../../Helpers/paginetion/Paginetion";
import { DeleteInvoice } from "../../../Store/Action/InvoiceAction/index";

function InvoiceList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const InvoiceData = useSelector((state) => state?.InvoiceData);
  let limit = 2;
  const data = [];
  console.log("successLoginData", successLoginData?.LoginData);
  const [pageNumber, setPageNumber] = useState();
  const [search, setSearch] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("BILL No");
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  InvoiceData.invoiceList.map((e) => {
    let elements = {};
    elements["BILL No"] = e.bill_no < 10 ? ` 0${e.bill_no}` : e.bill_no;
    elements["Invoice Date"] = convert(e.invoice_date);
    elements["Name"] = e.customer_name;
    elements["Total Amount"] = e.bill_amount;
    data.push(elements);
  });
  useEffect(() => {
    if (InvoiceData?.SucessDeletedInvoiceData?.statusCode == "200") {
      alert("sucessfully deleted");
      window.location.reload();
    }
  });
  useEffect(() => {
    if (successLoginData?.LoginData?.accessToken || accessToken?.accessToken) {
      dispatch(
        InvoiceListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          { limit: limit, pageNumber: pageNumber, orderByString: shorting }
        )
      );
      localStorage.setItem("InvoiceEditPageData", JSON.stringify([{}]));
    }
  }, [
    accessToken?.accessToken,
    dispatch,
    pageNumber,
    shorting,
    limit,
    successLoginData?.LoginData?.accessToken,
  ]);
  // eslint-disable-next-line array-callback-return

  const headalEdit = (data) => {
    navigate(
      `/InvoiceList/edit/${InvoiceData.invoiceList[data - 1]?.invoice_id}`
    );
  };

  const headalDelete = (data) => {
    if (window.confirm("Are you sure you want to Delete this invoice?")) {
      dispatch(
        DeleteInvoice(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          InvoiceData.invoiceList[data - 1]?.invoice_id
        )
      );
    }
  };
  const headalShorting = (data_a) => {
    shortingIcon === data_a ? setShortingIcon(null) : setShortingIcon(data_a);
    switch (data_a) {
      case "BILL No":
        if (shorting === "bill_no") {
          setShorting(null);
        } else {
          setShorting("bill_no");
        }
        return "done";
      case "Invoice Date":
        if (shorting === "invoice_date") {
          setShorting(null);
        } else {
          setShorting("invoice_date");
        }
        return "done";
      case "Name":
        if (shorting === "customer_name") {
          setShorting(null);
        } else {
          setShorting("customer_name");
        }
        return "done";
      case "Total Amount":
        if (shorting === "bill_amount") {
          setShorting(null);
        } else {
          setShorting("bill_amount");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };

  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        InvoiceListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          { search: search, limit: limit, pageNumber: pageNumber }
        )
      );
    }
  };

  return (
    <div>
      {InvoiceData?.invoiceList.length ? (
        <Container fixed>
          <Header
            name={"InvoiceList"}
            SearchBar={true}
            searchHeadal={searchHeadal}
            onKeyDown={onKeyDown}
          />
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
                onClick={() => navigate("/addinvoice")}
              >
                add invoice
              </Button>
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/viewdeletedinvoice ");
                }}
              >
                view deleted invoice
              </Button>
            </Stack>

            <Table
              data={data}
              headalEdit={headalEdit}
              headalDelete={headalDelete}
              headalShorting={headalShorting}
              ShortingHide={shortingIcon}
            />
            <Stack
              sx={{
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                padding: "20px  0 20px 20px",
              }}
            >
              <UsePagination
                countNumbuer={Math.ceil(
                  InvoiceData.invoiceList[0]?.total_count / limit
                )}
                PageNumber={setPageNumber}
              />
            </Stack>
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
