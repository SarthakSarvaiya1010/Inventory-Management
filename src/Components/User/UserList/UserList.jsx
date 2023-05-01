import React, { useEffect, useState } from "react";
// import data from "../../../dummy/data.json";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  userListAction,
  userDeleteAction,
  userGetByuuidDataAction,
} from "../../../Redux/UserReduk/UserThunk";
import CircularProgress from "@mui/material/CircularProgress";
import UsePagination from "../../../Helpers/pagination/Pagination";
import { quickLogin } from "../../../Redux/AuthSlice";
import DialogBox from "../../../Helpers/DialogBox/DialogBox";

function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const User = useSelector((state) => state?.User);
  let limit = 4;
  const [search, setSearch] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [shorting, setShorting] = useState();
  const [shortingIcon, setShortingIcon] = useState("Sr. No");
  const [open, setOpen] = useState(false);

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const data = [];

  useEffect(() => {
    dispatch(
      userListAction({
        limit: limit,
        pageNumber: pageNumber,
        orderByString: shorting,
      })
    );
  }, [dispatch, limit, pageNumber, shorting]);

  useEffect(() => {
    if (Object.keys(User.UserquickData).length) {
      dispatch(quickLogin(User?.UserquickData));
    }
  }, [User.UserDataByuuid, User.UserquickData, dispatch]);

  useEffect(() => {
    if (successLoginData.LoginData.statusCode === "200") {
      localStorage.setItem(
        "LoginData",
        JSON.stringify(successLoginData.LoginData)
      );
      localStorage.setItem("AuthError", "Authorization");
      setTimeout(() => {
        if (successLoginData.LoginData.role_id === 2) {
          navigate("/productlist");
        } else {
          if (successLoginData.LoginData.role_id === 1) {
            navigate("/userlist");
          }
        }
      }, 2100);
    } else if (successLoginData?.FailedLoginData?.status === "server_offline") {
    }
  }, [
    navigate,
    successLoginData?.FailedLoginData,
    successLoginData.LoginData,
    successLoginData.LoginData.statusCode,
  ]);

  // eslint-disable-next-line array-callback-return
  User.UserData.map((e) => {
    let elements = {};
    elements["Sr. No"] = e.sr_no < 10 ? ` 0${e.sr_no}` : e.sr_no;
    elements["Name"] = e.name;
    elements["Email Id"] = e.email;
    elements["Mobile no"] = e.mobile_no;
    data.push(elements);
  });

  const headalEdit = (data) => {
    navigate(`/user/edit/${User.UserData[data - 1]?.user_uuid}`);
  };

  const headallogin = (data) => {
    dispatch(userGetByuuidDataAction(User?.UserData[data - 1]?.user_uuid));
  };

  const headalDelete = (data) => {
    setOpen(data);

    // window.location.reload();
  };

  const finalDelete = () => {
    setOpen(false);
    dispatch(dispatch(userDeleteAction(User.UserData[open - 1]?.user_uuid)));
  };

  const searchHeadal = (e) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        userListAction({ search: search, limit: limit, pageNumber: pageNumber })
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
      {!User?.isLoading ? (
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
                  navigate("/userdeletelist");
                }}
              >
                view deleted User
              </Button>
            </Stack>

            <Table
              data={data}
              headalEdit={headalEdit}
              headalDelete={headalDelete}
              headalShorting={headalShorting}
              ShortingHide={shortingIcon}
              LoginIconShow={true}
              headallogin={headallogin}
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
                countNumbuer={Math.ceil(User.UserData[0]?.total_count / limit)}
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

export default UserList;
