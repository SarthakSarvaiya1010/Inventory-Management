import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";
import {
  BankInfoDeleteDataAction,
  BankInfoListAction,
} from "../../../Redux/BankInfoRedux/BankInfoThunk";

function BankInfoList() {
  const navigate = useNavigate(null);
  const dispatch = useDispatch(null);
  const [open, setOpen] = useState(false);

  const BankInfoData = useSelector((state) => state?.BankInfoData);

  let limit = 4;
  const [search, setSearch] = useState(null);
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState(null);
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const data = [];
  useEffect(() => {
    dispatch(
      BankInfoListAction({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
      })
    );
  }, [dispatch, limit, pageNumber, shorting]);

  // eslint-disable-next-line array-callback-return
  BankInfoData?.BankInfoList.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Bank Name"] = e.bank_name;
    elements["Balance"] = e.balance;

    data.push(elements);
  });

  const finalDelete = () => {
    setOpen(false);
    dispatch(
      BankInfoDeleteDataAction(
        BankInfoData?.BankInfoList[open - 1]?.bank_info_no
      )
    );
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        BankInfoListAction({
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
      case "Bank Name":
        if (shorting === "ASC/bank_name") {
          setShorting("DESC/bank_name");
        } else {
          setShorting("ASC/bank_name");
        }
        return "done";
      case "Balance":
        if (shorting === "ASC/balance") {
          setShorting("DESC/balance");
        } else {
          setShorting("ASC/balance");
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
        DialogText={"Are you sure you want to Delete this BankInfo?"}
        finalDelete={finalDelete}
      />
      {!BankInfoData?.isLoading ? (
        <Container fixed sx={{ Width: 100 }}>
          <Header
            name={"Bank Info List"}
            SearchBar={true}
            searchHeadal={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={onKeyDown}
          />
          <Container fixed sx={{ backgroundColor: "#EAEFF2", Width: 150 }}>
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
                  navigate("/addbank");
                }}
              >
                add bank
              </Button>
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/updatebalance");
                }}
              >
                Update Bank Balance
              </Button>
            </Stack>
            {BankInfoData?.BankInfoList?.length ? (
              <Table
                data={data}
                headalEdit={(data) => {
                  navigate(
                    `/bank/edit/${
                      BankInfoData?.BankInfoList[data - 1]?.bank_info_no
                    }`
                  );
                }}
                headalDelete={(data) => {
                  setOpen(data);
                }}
                headalShorting={headalShorting}
                ShortingHide={shortingIcon}
              />
            ) : (
              <h1 style={{ textAlign: "center", color: "red", margin: 0 }}>
                No any record found of search Bank
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
                  BankInfoData?.BankInfoList[0]?.total_count / limit
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

export default BankInfoList;
