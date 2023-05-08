import React, { useEffect, useState } from "react";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  TaxListAction,
  TaxDeleteAction,
} from "../../../Redux/TaxRedux/TaxThunk";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function TaxList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const TaxData = useSelector((state) => state?.TaxData);
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState(null);
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const [open, setOpen] = useState(false);
  let limit = 4;
  const data = [];

  // eslint-disable-next-line array-callback-return
  TaxData?.TaxList.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Tax Name"] = e.tax_name;
    elements["Tax Rate [ In % ]"] = e.tax_rate;
    elements["Tax Country"] = e.tax_country;
    elements["Active"] = e.isactive;
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
      TaxListAction({
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
        TaxListAction({ search: search, limit: limit, pageNumber: pageNumber })
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
      case "Active":
        if (shorting === "ASC/isactive") {
          setShorting("DESC/isactive");
        } else {
          setShorting("ASC/isactive");
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
      {!TaxData?.isLoading ? (
        <Container fixed>
          <Header
            name={"Tax List"}
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
                  navigate("/addtax");
                }}
              >
                add new tax
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/deletedtax");
                }}
              >
                view deleted Tax
              </Button>
            </Stack>
            {TaxData?.TaxList.length ? (
              <Table
                data={data}
                headalEdit={headalEdit}
                headalDelete={setOpen}
                headalShorting={headalShorting}
                ShortingHide={shortingIcon}
              />
            ) : (
              <h1 style={{ textAlign: "center", color: "red", margin: 0 }}>
                No any record found of search Tax
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
                  TaxData?.TaxList[0]?.total_count / limit
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

export default TaxList;
