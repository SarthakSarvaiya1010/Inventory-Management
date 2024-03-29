import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  PermanentCompanyDeleteAction,
  DeleteCompanyInfoAction,
} from "../../../Redux/CompanyRedux/CompanyThunk";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function CompanyDeleteList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CompanyInfo = useSelector((state) => state?.CompanyInfo);
  let limit = 4;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const data = [];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (CompanyInfo?.SuccessProductDeleteData?.statusCode === "200") {
      window.location.reload();
    }
  }, [CompanyInfo?.SuccessProductDeleteData?.statusCode]);

  useEffect(() => {
    dispatch(
      DeleteCompanyInfoAction({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
        search: search || null,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, limit, pageNumber, shorting]);
  // eslint-disable-next-line array-callback-return
  CompanyInfo?.DeleteCompanyInfo?.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Company Name"] = e.company_name;
    elements["Website"] = e.website;
    elements["Mobile no."] = e.mobile_no;
    // elements["Phone no."] = e.phone_no;
    elements["Tin GST no"] = e.tin_gst_no;
    // elements["Fax no"] = e.fax_no;

    data.push(elements);
  });

  const headalEdit = (data) => {
    navigate(
      `/company/edit/${CompanyInfo.DeleteCompanyInfo[data - 1]?.company_id}`
    );
  };

  const finalDelete = () => {
    setOpen(false);
    dispatch(
      PermanentCompanyDeleteAction(
        CompanyInfo?.DeleteCompanyInfo[open - 1]?.company_id
      )
    );
    window.location.reload();
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        DeleteCompanyInfoAction({
          search: search,
          limit: limit,
          pageNumber: pageNumber,
        })
      );
    }
  };

  const headalShorting = (data_a) => {
    shortingIcon === data_a ? setShortingIcon(null) : setShortingIcon(data_a);
    switch (data_a) {
      case "Sr. No":
        if (shorting === "sr_no") {
          setShorting(null);
        } else {
          setShorting("sr_no");
        }
        return "done";
      case "Company Name":
        if (shorting === "ASC/company_name") {
          setShorting("DESC/company_name");
        } else {
          setShorting("ASC/company_name");
        }
        return "done";
      case "Website":
        if (shorting === "ASC/website") {
          setShorting("DESC/website");
        } else {
          setShorting("ASC/website");
        }
        return "done";
      case "Mobile no.":
        if (shorting === "ASC/mobile_no") {
          setShorting("DESC/mobile_no");
        } else {
          setShorting("ASC/mobile_no");
        }
        return "done";
      case "Tin GST no":
        if (shorting === "ASC/tin_gst_no") {
          setShorting("DESC/tin_gst_no");
        } else {
          setShorting("ASC/tin_gst_no");
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
        DialogText={"Are you sure you want to Delete this Company?"}
        finalDelete={finalDelete}
      />
      {!CompanyInfo?.isLoading ? (
        <Container fixed sx={{ Width: 100 }}>
          <Header
            name={"Delete Company List"}
            SearchBar={true}
            searchHeadal={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={onKeyDown}
            search={search}
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
                  navigate("/companylist");
                }}
              >
                Back
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/addcompany");
                }}
              >
                add Company
              </Button>
            </Stack>

            <Table
              data={data}
              headalEdit={headalEdit}
              headalDelete={setOpen}
              headalShorting={headalShorting}
              ShortingHide={shortingIcon}
              hide={true}
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
                  CompanyInfo?.DeleteCompanyInfo[0]?.total_count / limit
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

export default CompanyDeleteList;
