import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  TaxDelectListAction,
  PermanentTaxDeleteAction,
} from "../../../Redux/TaxRedux/TaxThunk";
import UsePagination from "../../../Helpers/pagination/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function DeletedTaxList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = [];
  const TaxData = useSelector((state) => state?.TaxData);
  const [open, setOpen] = useState(false);
  const [shorting, setShorting] = useState(null);
  const [shortingIcon, setShortingIcon] = useState("Sr. No");

  const headalEdit = (data) => {
    navigate(
      `/product/edit/${TaxData?.productDeletList[data - 1]?.product_id}`
    );
  };

  // eslint-disable-next-line array-callback-return
  TaxData?.TaxDeletList.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no;
    elements["Tax Name"] = e.tax_name;
    elements["Tax Rate [ In % ]"] = e.tax_rate;
    elements["Tax Country"] = e.tax_country;
    data.push(elements);
  });
  let limit = 4;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();

  useEffect(() => {
    dispatch(
      TaxDelectListAction({
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
        TaxDelectListAction({
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
      case "Sr. No":
        if (shorting === "sr_no") {
          setShorting(null);
        } else {
          setShorting("sr_no");
        }
        return "done";
      case "Tax Name":
        if (shorting === "ASC/tax_name") {
          setShorting("DESC/tax_name");
        } else {
          setShorting("ASC/tax_name");
        }
        return "done";
      case "Tax Rate [ In % ]":
        if (shorting === "ASC/tax_rate") {
          setShorting("DESC/tax_rate");
        } else {
          setShorting("ASC/tax_rate");
        }
        return "done";
      case "Tax Country":
        if (shorting === "ASC/tax_country") {
          setShorting("DESC/tax_country");
        } else {
          setShorting("ASC/tax_country");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };
  const finalDelete = () => {
    setOpen(false);
    dispatch(PermanentTaxDeleteAction(TaxData?.TaxDeletList[open - 1]?.tax_id));
  };
  return (
    <div>
      <DialogBox
        setOpen={setOpen}
        open={open}
        DialogText={"Are you sure you want to Delete this Tax?"}
        finalDelete={finalDelete}
      />
      {!TaxData?.isLoading ? (
        <Container fixed>
          <Header
            name={"Deleted Tax List"}
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
                  navigate("/tax_list");
                }}
              >
                back
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/addtax");
                }}
              >
                add Tax
              </Button>
            </Stack>
            {TaxData?.TaxDeletList?.length ? (
              <Table
                data={data}
                headalDelete={setOpen}
                headalEdit={headalEdit}
                headalShorting={headalShorting}
                ShortingHide={shortingIcon}
                hide={true}
              />
            ) : (
              <h1 style={{ color: "red", textAlign: "center", padding: "5px" }}>
                No Any Record OF Deleted Tax
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
                  TaxData?.TaxDeletList[0]?.total_count / limit
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

export default DeletedTaxList;
