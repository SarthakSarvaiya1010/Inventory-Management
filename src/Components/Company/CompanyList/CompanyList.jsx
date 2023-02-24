import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  CompanyInfoAction,
  CompanyDeleteAction,
} from "../../../Store/Action/CompanyAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";

function CompanyList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const CompanyInfo = useSelector((state) => state?.CompanyInfo);
  let limit = 2;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const data = [];

  console.log("productData", CompanyInfo, "test");
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  useEffect(() => {
    if (CompanyInfo?.SuccessProductDeleteData?.statusCode === "200") {
      alert("Sucessfully product deleted");
      window.location.reload();
    }
  }, [CompanyInfo?.SuccessProductDeleteData?.statusCode]);

  useEffect(() => {
    dispatch(
      CompanyInfoAction(
        successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
        { limit: limit, pageNumber: pageNumber, orderByString: shorting }
      )
    );
  }, [
    accessToken?.accessToken,
    dispatch,
    limit,
    pageNumber,
    shorting,
    successLoginData?.LoginData?.accessToken,
  ]);

  // eslint-disable-next-line array-callback-return
  CompanyInfo?.CompanyInfo?.map((e) => {
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
    navigate(`/company/edit/${CompanyInfo.CompanyInfo[data - 1]?.company_id}`);
  };

  const headalDelete = (data) => {
    if (window.confirm("Are you sure you want to Delete this Company?")) {
      dispatch(
        CompanyDeleteAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          CompanyInfo?.CompanyInfo[data - 1]?.company_id
        )
      );
      window.location.reload();
    }
  };

  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        CompanyInfoAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken
        )
      );
    }
  };
  console.log(search);
  console.log("setShortingData", shorting);

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
        if (shorting === "company_name") {
          setShorting(null);
        } else {
          setShorting("company_name");
        }
        return "done";
      case "Website":
        if (shorting === "website") {
          setShorting(null);
        } else {
          setShorting("website");
        }
        return "done";
      case "Mobile no.":
        if (shorting === "mobile_no") {
          setShorting(null);
        } else {
          setShorting("mobile_no");
        }
        return "done";
      case "Tin GST no":
        if (shorting === "tin_gst_no") {
          setShorting(null);
        } else {
          setShorting("tin_gst_no");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };

  return (
    <div>
      {CompanyInfo?.CompanyInfo?.length ? (
        <Container fixed sx={{ Width: 100 }}>
          <Header
            name={"Company List"}
            SearchBar={true}
            searchHeadal={searchHeadal}
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
                  navigate("/addproduct");
                }}
              >
                add Company
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/deletedproduct");
                }}
              >
                view deleted Company
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
                  CompanyInfo?.CompanyInfo[0]?.total_count / limit
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

export default CompanyList;
