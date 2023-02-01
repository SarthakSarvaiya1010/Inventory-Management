import React, { useEffect } from "react";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CustomerDelectListAction } from "../../../Store/Action/CustomerAction/index";
import CircularProgress from "@mui/material/CircularProgress";

function DeletedCustomerList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CustomerData = useSelector((state) => state?.CustomerEdit);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);

  console.log("data", CustomerData.customerDeletedList);
  useEffect(() => {
    if (successLoginData?.LoginData?.accessToken) {
      dispatch(
        CustomerDelectListAction(successLoginData?.LoginData?.accessToken)
      );
    }
  }, [dispatch, successLoginData?.LoginData?.accessToken]);
  const data = [];

  // eslint-disable-next-line array-callback-return
  CustomerData?.customerDeletedList.map((e) => {
    let test = {};
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

  return (
    <div>
      {CustomerData?.customerDeletedList?.length ? (
        <Container fixed>
          <Header name={"Deleted Customer List"} SearchBar={true} />
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
                  navigate("/customerList");
                }}
              >
                back
              </Button>

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
            </Stack>

            <Table data={data} headalEdit={headalEdit} />
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

export default DeletedCustomerList;
