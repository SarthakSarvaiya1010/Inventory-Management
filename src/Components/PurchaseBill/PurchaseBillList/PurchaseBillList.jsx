/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { PurchaseBillListAction } from "../../../Redux/PurchaseBillRedux/PurchaseBillThank";
import CircularProgress from "@mui/material/CircularProgress";
import { convert } from "../../../Helpers/misc";
import UsePagination from "../../../Helpers/pagination/Pagination";
import { DeleteInvoice } from "../../../Redux/InvoiceRedux/InvoiceThunk";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function PurchaseBillList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const PurchaseData = useSelector((state) => state?.PurchaseData);
  // const InvoiceData = useSelector((state) => state?.PurchaseData);
  let limit = 4;
  const [open, setOpen] = useState(false);
  const data = [];
  console.log("PurchaseData", PurchaseData);
  const [pageNumber, setPageNumber] = useState();
  const [search, setSearch] = useState();
  const [shorting, setShorting] = useState();

  const [shortingIcon, setShortingIcon] = useState("Sr.No");
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  PurchaseData?.PurchaseBillList?.map((e) => {
    let elements = {};
    elements["Sr.No"] = e.sr_no;
    elements["BILL No"] = e.bill_no < 10 ? ` 0${e.bill_no}` : e.bill_no;
    elements["Invoice Date"] = convert(e.purchase_date);
    elements["Name"] = e.customer_name;
    elements["Total Amount"] = e.bill_amount;
    data.push(elements);
  });

  useEffect(() => {
    if (accessToken?.accessToken) {
      dispatch(
        PurchaseBillListAction({
          limit: limit,
          pageNumber: pageNumber,
          orderByString: shorting,
        })
      );
      localStorage.setItem("InvoiceEditPageData", JSON.stringify([{}]));
    }
  }, [accessToken?.accessToken, dispatch, pageNumber, shorting, limit]);
  // eslint-disable-next-line array-callback-return

  const headalEdit = (data) => {
    navigate(
      `/purchasebill/edit/${
        PurchaseData.PurchaseBillList[data - 1]?.purchase_id
      }`
    );
  };

  const finalDelete = () => {
    setOpen(false);
    dispatch(
      DeleteInvoice(PurchaseData.PurchaseBillList[open - 1]?.purchase_id)
    );
  };
  const headalShorting = (data_a) => {
    shortingIcon === data_a
      ? setShortingIcon(`D ${data_a}`)
      : setShortingIcon(data_a);
    switch (data_a) {
      case "Sr.No":
        if (shorting === "sr_no") {
          setShorting(null);
        } else {
          setShorting("sr_no");
        }
        return "done";
      case "BILL No":
        if (shorting === "ASC/bill_no") {
          setShorting("DESC/bill_no");
        } else {
          setShorting("ASC/bill_no");
        }
        return "done";
      case "Invoice Date":
        if (shorting === "ASC/invoice_date") {
          setShorting("DESC/invoice_date");
        } else {
          setShorting("ASC/invoice_date");
        }
        return "done";
      case "Name":
        if (shorting === "ASC/customer_name") {
          setShorting("DESC/customer_name");
        } else {
          setShorting("ASC/customer_name");
        }
        return "done";
      case "Total Amount":
        if (shorting === "ASC/bill_amount") {
          setShorting("DESC/bill_amount");
        } else {
          setShorting("ASC/bill_amount");
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
        PurchaseBillListAction({
          search: search,
          limit: limit,
          pageNumber: pageNumber,
        })
      );
    }
  };

  return (
    <div>
      {" "}
      <DialogBox
        setOpen={setOpen}
        open={open}
        DialogText={"Are you sure you want to Delete this invoice?"}
        finalDelete={finalDelete}
      />
      {PurchaseData?.PurchaseBillList?.length ? (
        <Container fixed>
          <Header
            name={"PurchaseBill List"}
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
                onClick={() => {
                  navigate("/addpurchasebill");
                }}
              >
                add Purchase Bill
              </Button>
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/viewdeletedpurchase");
                }}
              >
                view deleted Purchase Bill
              </Button>
            </Stack>

            <Table
              data={data}
              headalEdit={headalEdit}
              headalDelete={setOpen}
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
                  PurchaseData?.PurchaseBillList[0]?.total_count / limit
                )}
                PageNumber={setPageNumber}
                currentPage={pageNumber}
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

export default PurchaseBillList;
