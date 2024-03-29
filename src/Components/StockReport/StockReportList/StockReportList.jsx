import React, { useEffect, useState } from "react";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import {
  Stack,
  //  Button
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TaxDeleteAction } from "../../../Redux/TaxRedux/TaxThunk";
import { StockReportListAction } from "../../../Redux/StockReportRedux/StockReportThunk";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function StockReportList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const TaxData = useSelector((state) => state?.TaxData);
  const StockReport = useSelector((state) => state?.StockReport);
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr.No");
  const [open, setOpen] = useState(false);
  let limit = 4;
  const data = [];

  // eslint-disable-next-line array-callback-return
  StockReport?.Stock.map((e) => {
    let elements = {};
    elements["Sr.No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Product Name"] = e.product_name;
    elements["Total Quantity"] = e.quantity;
    elements["Unit"] = e.unit;
    elements["HSN"] = e.hsn;
    data.push(elements);
  });

  const finalDelete = () => {
    setOpen(false);
    dispatch(TaxDeleteAction(TaxData?.TaxList[open - 1]?.tax_id));
  };

  const headalEdit = (data) => {
    navigate(`/tax/edit/${TaxData?.TaxList[data - 1]?.tax_id}`);
  };

  useEffect(() => {
    dispatch(
      StockReportListAction({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
        search: search || null,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, limit, pageNumber, shorting]);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        StockReportListAction({
          search: search,
          limit: limit,
          pageNumber: pageNumber,
        })
      );
    }
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
      case "Product Name":
        if (shorting === "ASC/product_name") {
          setShorting("DESC/product_name");
        } else {
          setShorting("ASC/product_name");
        }
        return "done";
      case "Total Quantity":
        if (shorting === "ASC/quantity") {
          setShorting("DESC/quantity");
        } else {
          setShorting("ASC/quantity");
        }
        return "done";
      case "Unit":
        if (shorting === "ASC/unit") {
          setShorting("DESC/unit");
        } else {
          setShorting("ASC/unit");
        }
        return "done";
      case "HSN":
        if (shorting === "ASC/hsn") {
          setShorting("DESC/hsn");
        } else {
          setShorting("ASC/hsn");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };
  return (
    <div>
      <DialogBox
        setOpen={setOpen}
        open={open}
        DialogText={"Are you sure you want to Delete this Tax?"}
        finalDelete={finalDelete}
      />
      {!StockReport?.isLoading ? (
        <Container fixed>
          <Header
            name={"Stock List"}
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
            ></Stack>

            {StockReport?.Stock?.length ? (
              <Table
                data={data}
                headalEdit={headalEdit}
                headalDelete={setOpen}
                headalShorting={headalShorting}
                ShortingHide={shortingIcon}
                hide={true}
                actionHide={true}
              />
            ) : (
              <h1 style={{ textAlign: "center", color: "red", margin: 0 }}>
                No any record found of search Stock
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
                  StockReport?.Stock[0]?.total_count / limit
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

export default StockReportList;
