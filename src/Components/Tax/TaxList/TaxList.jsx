import React, { useEffect } from "react";
import Table from "../../../Helpers/Table/Table";
import Header from "../../../Helpers/Header/Header";
import Container from "@mui/material/Container";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TaxListAction } from "../../../Store/Action/TaxAction/index";
import CircularProgress from "@mui/material/CircularProgress";

function TaxList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const TaxData = useSelector((state) => state?.TaxData);
  const data = [];
  console.log("successLoginData", TaxData);

  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  useEffect(() => {
    if (successLoginData?.LoginData?.accessToken || accessToken?.accessToken) {
      dispatch(
        TaxListAction(
          successLoginData?.LoginData?.accessToken || accessToken?.accessToken
        )
      );
    }
  }, [
    accessToken?.accessToken,
    dispatch,
    successLoginData?.LoginData?.accessToken,
  ]);
  // eslint-disable-next-line array-callback-return
  TaxData?.TaxList.map((e) => {
    let elements = {};
    elements["Tax Name"] = e.tax_name;
    elements["Tax Rate [ In % ]"] = e.tax_rate;
    elements["Tax Country"] = e.tax_country;
    elements["Active"] = e.isactive;
    data.push(elements);
  });

  const headalEdit = (data) => {
    navigate(`/tax/edit/${TaxData?.TaxList[data - 1]?.tax_id}`);
  };

  const headalDelete = (data) => {
    // dispatch(
    //   ProductDeleteAction(
    //     successLoginData?.LoginData?.accessToken,
    //     productData.productList[data - 1]?.product_id
    //   )
    // );
    window.location.reload();
  };
  return (
    <div>
      {" "}
      {TaxData?.TaxList.length ? (
        <Container fixed>
          <Header name={"Tax List"} SearchBar={true} />
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
                  navigate("/deletedproduct");
                }}
              >
                view deleted Tax
              </Button>
            </Stack>
            <Table
              data={data}
              headalEdit={headalEdit}
              headalDelete={headalDelete}
            />
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
