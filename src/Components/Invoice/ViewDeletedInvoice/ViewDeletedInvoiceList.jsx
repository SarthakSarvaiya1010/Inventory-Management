import React, { useEffect, useState } from "react";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import { Stack, Button, Container, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  GetDeletedInvoiceList,
  PermanentDeleteInvoice,
} from "../../../Store/Action/InvoiceAction/index";
import UsePagination from "../../../Helpers/pagination/Pagination";
import { convert } from "../../../Helpers/misc";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

export default function ViewDeletedInvoiceList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const DeletedInvoiceList = useSelector((state) => state?.InvoiceData);
  const [open, setOpen] = useState(false);
  const data = [];
  let limit = 2;
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("BILL No");
  const [search, setSearch] = useState();
  console.log("DeletedInvoiceList", DeletedInvoiceList?.DeletedInvoiceList);

  // eslint-disable-next-line array-callback-return
  DeletedInvoiceList?.DeletedInvoiceList?.map((e) => {
    let elements = {};
    elements["BILL No"] = `0${e.bill_no}`;
    elements["Invoice Date"] = convert(e.invoice_date);
    elements["Name"] = e.customer_name;
    elements["Total Amount"] = e.bill_amount;
    data.push(elements);
  });

  useEffect(() => {
    if (DeletedInvoiceList?.SucessPermanentDeletedData?.statusCode === "200") {
      alert("sucessfully deleted");
      window.location.reload();
    }
  }, [DeletedInvoiceList?.SucessPermanentDeletedData?.statusCode]);
  useEffect(() => {
    dispatch(GetDeletedInvoiceList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      GetDeletedInvoiceList({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
      })
    );
  }, [dispatch, limit, pageNumber, shorting]);
  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        GetDeletedInvoiceList({
          search: search,
          limit: limit,
          pageNumber: pageNumber,
        })
      );
    }
  };

  const headalShorting = (data_a) => {
    shortingIcon === data_a
      ? setShortingIcon("Sr. No")
      : setShortingIcon(data_a);
    switch (data_a) {
      case "BILL No":
        if (shorting === "bill_no") {
          setShorting(null);
        } else {
          setShorting("bill_no");
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
  const finalDelete = () => {
    setOpen(false);
    dispatch(
      PermanentDeleteInvoice(
        DeletedInvoiceList?.DeletedInvoiceList[open - 1]?.invoice_id
      )
    );
  };
  return (
    <div>
      <DialogBox
        setOpen={setOpen}
        open={open}
        DialogText={"Are you sure you want to Delete this invoice?"}
        finalDelete={finalDelete}
      />
      {DeletedInvoiceList?.DeletedInvoiceLoader ? (
        DeletedInvoiceList?.DeletedInvoiceList?.length ? (
          <Container fixed>
            <Header
              name={"Delete Invoice List"}
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
                    navigate("/invoice_list");
                  }}
                >
                  back
                </Button>

                <Button
                  variant="text"
                  color="success"
                  sx={{ fontSize: 16 }}
                  onClick={() => {
                    navigate("/addinvoice");
                  }}
                >
                  Add Invoice{" "}
                </Button>
              </Stack>
              <Table
                data={data}
                headalDelete={setOpen}
                hide={true}
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
                    DeletedInvoiceList?.DeletedInvoiceList[0]?.total_count /
                      limit
                  )}
                  PageNumber={setPageNumber}
                />
              </Stack>
            </Container>
          </Container>
        ) : (
          <Container fixed>
            <Header
              name={"Delete Invoice List"}
              SearchBar={false}
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
                    navigate("/invoice_list");
                  }}
                >
                  back
                </Button>

                <Button
                  variant="text"
                  color="success"
                  sx={{ fontSize: 16 }}
                  onClick={() => {
                    navigate("/addinvoice");
                  }}
                >
                  Add Invoice
                </Button>
              </Stack>
              <h1 style={{ textAlign: "center", color: "red", margin: 0 }}>
                No any record found of Deleted Invoice
              </h1>
            </Container>
          </Container>
        )
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
