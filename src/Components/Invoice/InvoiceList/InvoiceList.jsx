/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button, Backdrop } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  GetinvoiceEditDataAction,
  InvoiceListAction,
  PrintInvoiceData,
} from "../../../Redux/InvoiceRedux/InvoiceThunk";
import CircularProgress from "@mui/material/CircularProgress";
import { convert } from "../../../Helpers/misc";
import UsePagination from "../../../Helpers/pagination/Pagination";
import { DeleteInvoice } from "../../../Redux/InvoiceRedux/InvoiceThunk";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function InvoiceList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const InvoiceData = useSelector((state) => state?.InvoiceData);
  let limit = 4;
  const [open, setOpen] = useState(false);
  const data = [];

  const [pageNumber, setPageNumber] = useState();
  const [search, setSearch] = useState();
  const [shorting, setShorting] = useState();
  const [print, setPrint] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr.No");
  const [disabled, setDisabled] = useState(false);

  InvoiceData.invoiceList.map((e) => {
    let elements = {};
    elements["Sr.No"] = e.sr_no;
    elements["BILL No"] = e.bill_no < 10 ? ` 0${e.bill_no}` : e.bill_no;
    elements["Invoice Date"] = convert(e.invoice_date);
    elements["Name"] = e.customer_name;
    elements["Total Amount"] = e.bill_amount;
    data.push(elements);
  });

  useEffect(() => {
    dispatch(
      InvoiceListAction({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
        search: search || null,
      })
    );
    localStorage.setItem("InvoiceEditPageData", JSON.stringify([{}]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, limit, pageNumber, shorting]);
  // eslint-disable-next-line array-callback-return

  const headalEdit = (data) => {
    navigate(
      `/InvoiceList/edit/${InvoiceData.invoiceList[data - 1]?.invoice_id}`
    );
  };

  const finalDelete = () => {
    setOpen(false);
    dispatch(DeleteInvoice(InvoiceData.invoiceList[open - 1]?.invoice_id));
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

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        InvoiceListAction({
          search: search,
          limit: limit,
          pageNumber: pageNumber,
        })
      );
    }
  };
  const InvoicePageData = useSelector((state) => state?.InvoiceData);
  if (
    InvoicePageData?.invoiceEdit.length > 0 &&
    InvoicePageData.PrintInvoicePdf.length === 0 &&
    print === "PrintInvoiceData"
  ) {
    let count = 0;
    let data = {};
    let product_data = [];
    data["bill_amount"] = InvoicePageData?.invoiceEdit[0].bill_amount;
    data["bill_no"] = InvoicePageData?.invoiceEdit[0].bill_no;
    data["cgst"] = InvoicePageData?.invoiceEdit[0].cgst;
    data["customer_id"] = InvoicePageData?.invoiceEdit[0].customer_id;
    data["discount"] = InvoicePageData?.invoiceEdit[0].discount;
    data["invoice_date"] = InvoicePageData?.invoiceEdit[0].invoice_date;
    data["sgst"] = InvoicePageData?.invoiceEdit[0].sgst;
    data["taxable_amount"] = InvoicePageData?.invoiceEdit[0].taxable_amount;
    InvoicePageData?.invoiceEdit[0].productlistdata.map((e) => {
      count++;
      let dummy = {};
      dummy["amount"] = e.amount;
      dummy["hsn"] = e.hsn;
      dummy["product_id"] = e.product_id;
      dummy["rate"] = e.rate;
      dummy["weight"] = e.weight;
      product_data.push(dummy);
    });
    data["productdata"] = product_data;

    if (count === InvoicePageData?.invoiceEdit[0].productlistdata.length) {
      setDisabled(true);
      count = 0;
      setPrint("StartPrint");
      dispatch(PrintInvoiceData(data));
    }
  }
  const headalPrint = (data) => {
    setPrint("PrintInvoiceData");
    dispatch(
      GetinvoiceEditDataAction(InvoiceData.invoiceList[data - 1]?.invoice_id)
    );
  };

  var b64;
  if (
    InvoicePageData?.PrintInvoicePdf?.status === "success" &&
    print === "StartPrint"
  ) {
    b64 = InvoicePageData?.PrintInvoicePdf?.invoicePdf;
    setPrint(null);
  }
  if (b64) {
    var obj = document.createElement("object");
    obj.style.width = "100%";
    obj.style.height = "1000pt";
    obj.type = "application/pdf";
    obj.data = "data:application/pdf;base64," + b64;
    // document.body.appendChild(obj);
    var link = document.createElement("a");
    // link.innerHTML = "Download PDF file";
    link.download = "invoice.pdf";
    link.href = "data:application/pdf;base64," + b64;
    document.body.appendChild(link);
    setTimeout(() => {
      let pdfWindow = window.open("");
      setDisabled(false);
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(b64) +
          "'></iframe>"
      );
    }, 3000);
  }
  return (
    <div>
      <DialogBox
        setOpen={setOpen}
        open={open}
        DialogText={"Are you sure you want to Delete this invoice?"}
        finalDelete={finalDelete}
      />

      {!InvoiceData?.isLoading ? (
        <Container fixed>
          <Header
            name={"InvoiceList"}
            SearchBar={true}
            searchHeadal={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={onKeyDown}
            search={search}
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
                  navigate("/addinvoice");
                }}
              >
                add invoice
              </Button>
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/viewdeletedinvoice");
                }}
              >
                view deleted invoice
              </Button>
            </Stack>
            {InvoiceData?.invoiceList?.length ? (
              <Table
                data={data}
                headalEdit={headalEdit}
                headalDelete={setOpen}
                headalShorting={headalShorting}
                ShortingHide={shortingIcon}
                printIcon={true}
                headalPrint={headalPrint}
              />
            ) : (
              <h1 style={{ textAlign: "center", color: "red", margin: 0 }}>
                No any record found of search Invoice
              </h1>
            )}
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
                currentPage={pageNumber}
              />
            </Stack>
          </Container>
          {disabled ? (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={disabled}
              // onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            ""
          )}
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
