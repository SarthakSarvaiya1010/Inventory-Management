import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userDelteListAction } from "../../../Store/Action/UserAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";

function UserDeleteList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const User = useSelector((state) => state?.User);
  let limit = 2;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const data = [];

  console.log("User", User, "test");
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  useEffect(() => {
    dispatch(
      userDelteListAction(
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
  User.UserDeleteList.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Name"] = e.name;
    elements["Email Id"] = e.email;
    elements["Mobile no"] = e.mobile_no;
    data.push(elements);
  });

  const headalEdit = (data) => {
    navigate(`/product/edit/${User.UserDeleteList[data - 1]?.user_id}`);
  };

  const headalDelete = (data) => {
    if (window.confirm("Are you sure you want to Delete this Product?")) {
      dispatch(
        userDelteListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          User.UserDeleteList[data - 1]?.product_id
        )
      );
    }
    // window.location.reload();
  };

  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        userDelteListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken,
          { search: search, limit: limit, pageNumber: pageNumber }
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
      case "Product Name":
        if (shorting === "product_name") {
          setShorting(null);
        } else {
          setShorting("product_name");
        }
        return "done";
      case "HSN":
        if (shorting === "hsn") {
          setShorting(null);
        } else {
          setShorting("hsn");
        }
        return "done";
      case "Weight [ In Grams ]":
        if (shorting === "weight") {
          setShorting(null);
        } else {
          setShorting("weight");
        }
        return "done";
      default:
        setShorting(null);
        return " state";
    }
  };

  return (
    <div>
      {User?.UserDeleteList?.length ? (
        <Container fixed sx={{ Width: 100 }}>
          <Header
            name={"User List"}
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
                add User
              </Button>

              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  navigate("/deletedproduct");
                }}
              >
                view deleted User
              </Button>
            </Stack>

            <Table
              data={data}
              hide={true}
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
                  User.UserDeleteList[0]?.total_count / limit
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

export default UserDeleteList;
