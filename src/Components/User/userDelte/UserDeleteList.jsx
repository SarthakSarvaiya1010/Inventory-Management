import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  userDeletepermanentAction,
  userDelteListAction,
} from "../../../Redux/UserReduk/UserThunk";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function UserDeleteList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const User = useSelector((state) => state?.User);

  let limit = 4;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const data = [];

  useEffect(() => {
    dispatch(
      userDelteListAction({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
      })
    );
  }, [dispatch, limit, pageNumber, shorting]);

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
    navigate(`/user/edit/${User.UserDeleteList[data - 1]?.user_uuid}`);
  };

  const headalDelete = (data) => {
    setOpen(data);
  };
  const finalDelete = () => {
    setOpen(false);
    dispatch(
      userDeletepermanentAction(User.UserDeleteList[open - 1]?.user_uuid)
    );
  };

  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        userDelteListAction({
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
      case "Name":
        if (shorting === "ASC/name") {
          setShorting("DESC/name");
        } else {
          setShorting("ASC/name");
        }
        return "done";
      case "Email Id":
        if (shorting === "ASC/email") {
          setShorting("DESC/email");
        } else {
          setShorting("ASC/email");
        }
        return "done";
      case "Mobile no":
        if (shorting === "ASC/mobile_no") {
          setShorting("DESC/mobile_no");
        } else {
          setShorting("ASC/mobile_no");
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
        DialogText={"Are you sure you want to Delete this User?"}
        finalDelete={finalDelete}
      />
      {!User?.Loader ? (
        User?.UserDeleteList?.length ? (
          <Container fixed sx={{ Width: 100 }}>
            <Header
              name={"Delete User List"}
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
                    localStorage.setItem("NavigateItemName", "adduser");
                    navigate("/adduser");
                  }}
                >
                  add User
                </Button>

                <Button
                  variant="text"
                  color="success"
                  sx={{ fontSize: 16 }}
                  onClick={() => {
                    localStorage.setItem("NavigateItemName", "userlist");
                    navigate("/userlist");
                  }}
                >
                  Back
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
          <Container fixed sx={{ Width: 100 }}>
            <Header
              name={"Delete User List"}
              SearchBar={false}
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
                    localStorage.setItem("NavigateItemName", "adduser");
                    navigate("/adduser");
                  }}
                >
                  add User
                </Button>

                <Button
                  variant="text"
                  color="success"
                  sx={{ fontSize: 16 }}
                  onClick={() => {
                    localStorage.setItem("NavigateItemName", "userlist");
                    navigate("/userlist");
                  }}
                >
                  Back
                </Button>
              </Stack>
              <h1 style={{ textAlign: "center", color: "red", margin: 0 }}>
                No any record found of Deleted User
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

export default UserDeleteList;
