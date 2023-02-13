import React, { useEffect, useState } from "react";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomerListAction,
  CustomerDeleteAction,
} from "../../../Store/Action/CustomerAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/paginetion/Paginetion";

function CustomerList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CustomerData = useSelector((state) => state?.CustomerList);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const [search, setSearch] = useState(null);
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const [pageNumber, setPageNumber] = useState();
  let limit = 2;

  // useEffect(() => {
  //   if (successLoginData?.LoginData?.accessToken || accessToken?.accessToken) {
  //     dispatch(
  //       CustomerListAction(
  //         successLoginData?.LoginData?.accessToken || accessToken?.accessToken
  //       )
  //     );
  //   }
  // }, [
  //   accessToken?.accessToken,
  //   dispatch,
  //   successLoginData?.LoginData?.accessToken,
  // ]);
  const data = [];

  // eslint-disable-next-line array-callback-return
  CustomerData?.CoustomerList.map((e) => {
    let test = {};
    test["Sr. No"] = e.sr_no;
    test["Name"] = e.customer_name;
    test["Mobile Number"] = e.mobile_no;
    test["Email Id"] = e.email;
    data.push(test);
  });
  const headalEdit = (data) => {
    console.log(data, CustomerData?.CoustomerList[data - 1]);

    navigate(
      `/customer/edit/${CustomerData?.CoustomerList[data - 1]?.customer_id}`
    );
  };

  const headalDelete = (data) => {
    dispatch(
      CustomerDeleteAction(
        successLoginData?.LoginData?.accessToken,
        CustomerData.CoustomerList[data - 1]?.customer_id
      )
    );
    window.location.reload();
  };
  const searchHeadal = (e) => {
    console.log(e.target.value, "e.target.value");
    setSearch(e.target.value);
  };
  console.log("search", search);
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        CustomerListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          { search: search, limit: limit, pageNumber: pageNumber }
        )
      );
    }
  };

  useEffect(() => {
    dispatch(
      CustomerListAction(accessToken?.accessToken, {
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
      })
    );
  }, [accessToken?.accessToken, dispatch, limit, pageNumber, shorting]);

  const headalShorting = (data_a) => {
    shortingIcon === data_a
      ? setShortingIcon("Sr. No")
      : setShortingIcon(data_a);
    switch (data_a) {
      case "Sr. No":
        if (shorting === "sr_no") {
          setShorting(null);
        } else {
          setShorting("sr_no");
        }
        return "done";
      case "Name":
        if (shorting === "customer_name") {
          setShorting(null);
        } else {
          setShorting("customer_name");
        }
        return "done";
      case "Mobile Number":
        if (shorting === "mobile_no") {
          setShorting(null);
        } else {
          setShorting("mobile_no");
        }
        return "done";
      case "Email Id":
        if (shorting === "email") {
          setShorting(null);
        } else {
          setShorting("email");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };
  return (
    <div>
      {CustomerData?.CoustomerList?.length ? (
        <Container fixed>
          <Header
            name={"Customer List"}
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
                  navigate("/addcustomer");
                }}
              >
                Add New Customer
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/deletedcustomer");
                }}
              >
                view deleted Customer
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
                  CustomerData?.CoustomerList[0]?.total_count / limit
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

export default CustomerList;
